import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  HttpService,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  TransactionManager,
  EntityManager,
  MoreThanOrEqual,
  Between,
  Like,
  getConnection,
} from 'typeorm';
import { map } from 'rxjs/operators';
import { Documento } from './documento.entity';
import { DocumentoDTO, DocumentoRO } from './documento.dto';
import { MovimientoService } from 'src/modules/movimiento/movimiento.service';
import { Expediente } from '../expediente.entity';
import { ExpedienteDTO } from '../expediente.dto';
import { Documentoexpediente } from '../documentoexpediente/documentoexpediente.entitys';
import { Movimiento } from 'src/modules/movimiento/movimiento.entity';
import { Movimientoestado } from 'src/modules/movimiento/movimientoestado/movimientoestado.entity';
import { Estadomovimiento } from 'src/modules/movimiento/estadomovimiento/estadomovimiento.entity';
import { Categoriadocumento } from './categoriadocumento/categoriadocumento.entity';
import * as momenttz from 'moment-timezone';
import * as moment from 'moment';
import { formatFechaCorta, formatFechaAdd } from 'src/shared/util';
import * as request from 'request';
import { Tipodocumento } from './tipodocumento/tipodocumento.entity';
import { DocumentoGateway } from 'src/gateways/documento.gateway';
import { DocumentoVista } from './documentoview.entity';

@Injectable()
export class DocumentoService {
  private logger = new Logger('DocumentoService');
  constructor(
    @InjectRepository(Documento)
    private documentoRepository: Repository<Documento>,
    @InjectRepository(Categoriadocumento)
    private categoriaDocumentoRepository: Repository<Categoriadocumento>,
    @InjectRepository(Tipodocumento)
    private tipoDocumentoRepository: Repository<Tipodocumento>,
    @InjectRepository(Movimiento)
    private movimientoRepository: Repository<Movimiento>,
    @InjectRepository(DocumentoVista)
    private documentoVistaRepository: Repository<DocumentoVista>,
    private httpService: HttpService,
    private documentoGateway: DocumentoGateway,
  ) {}

  private async getRequest(method, endpoint: string, body?) {
    return this.httpService
      .request({
        method,
        url: endpoint,
        data: {
          body,
        },
      })
      .pipe(map(response => response.data))
      .toPromise();
  }

  async vista(
    {
      fecha1 = new Date().toLocaleDateString(),
      fecha2 = formatFechaAdd(new Date(), 1, 'day'),
      codigo = null,
      idarearecep,
      ...filtros
    },
    @TransactionManager() manager?: EntityManager,
  ) {
    const qb = await manager
      .createQueryBuilder(DocumentoVista, 'documentovista')
      .where(`idarearecep = :idarearecep`, {
        idarearecep,
      });
    if (codigo !== null) {
      if (codigo.includes('-')) {
        qb.andWhere(`codigo like '%${codigo}%'`);
      } else {
        qb.andWhere(`correlativo = ${Number(codigo)}`);
      }
    } else {
      qb.andWhere('fecha between :fecha1 and :fecha2', {
        fecha1,
        fecha2,
      });
    }
    for (const campo in filtros) {
      const valor = filtros[campo];
      if (campo === 'descripcion' || campo === 'administrado') {
        qb.andWhere(`${campo} like '%${valor}%'`);
      } else if (campo === 'idtipdoc') {
        qb.andWhere(`${campo} = ${valor}`);
      }
    }
    const documento = await qb.getMany();
    return documento;
  }

  async obtenerDocumentos(
    {
      fecha1 = new Date().toLocaleDateString(),
      fecha2 = formatFechaAdd(new Date(), 1, 'day'),
      codigo = null,
      idarearecep,
      ...filtros
    },
    @TransactionManager() manager?: EntityManager,
  ): Promise<any> {
    if (!idarearecep)
      throw new HttpException(
        `Es necesario el Id de Area`,
        HttpStatus.BAD_REQUEST,
      );
    const qb = await manager
      .createQueryBuilder(Documento, 'documento')
      .leftJoinAndSelect(
        Movimiento,
        'movimiento',
        'movimiento.iddocumento = documento.iddocumento',
      )
      .leftJoinAndSelect(
        Expediente,
        'expediente',
        'expediente.idexpediente = movimiento.idexpediente',
      )
      .leftJoinAndSelect(
        Movimientoestado,
        'movimientoestado',
        'movimientoestado.idmovimiento = movimiento.idmovimiento',
      );
    qb.where(`movimiento.idarearecep = :idarearecep`, {
      idarearecep,
    });
    if (codigo !== null) {
      if (codigo.includes('-')) {
        qb.andWhere(`documento.codigo like '%${codigo}%'`);
      } else {
        qb.andWhere(`documento.correlativo = ${Number(codigo)}`);
      }
    } else {
      qb.andWhere('documento.fecha between :fecha1 and :fecha2', {
        fecha1,
        fecha2,
      });
    }
    for (const campo in filtros) {
      const valor = filtros[campo];
      if (campo === 'descripcion') {
        qb.andWhere(`documento.${campo} like '%${valor}%'`);
      } else if (campo === 'administrado') {
        qb.andWhere(`expediente.${campo} like :${campo}`, { campo: valor });
      } else if (campo === 'idtipdoc') {
        qb.andWhere(`documento.${campo} = ${valor}`);
      }
    }
    const documentos = await qb.getMany();
    return documentos;
  }

  async derivarDocumento(
    documento: Partial<DocumentoDTO>,
    usuario?,
    movimiento?,
    @TransactionManager() manager?: EntityManager,
  ) {
    const { idarearecep } = usuario;

    const { iddocumento, codigo } = await this.guardarDocumento(
      documento,
      usuario,
      manager,
      true,
    );

    for (let i = 0; i < movimiento.length; i++) {
      const element: Partial<Movimiento> = movimiento[i];
      await this.guardarMovimiento(
        element.idexpediente,
        iddocumento,
        usuario,
        2,
        manager,
      );
    }
    const documentoDerivado = await this.vista(
      { codigo, idarearecep },
      manager,
    );
    this.documentoGateway.wss.emit('[DOCUMENTO] DERIVADO', documentoDerivado);
    return documentoDerivado;
  }

  async guardarMovimiento(
    idexpediente: number,
    iddocumento: number,
    { idusuarioemis, idusuariorecep, idareaemis, idarearecep },
    idestadomovimiento,
    @TransactionManager() manager?: EntityManager,
  ) {
    const managerMovimiento = manager.getRepository(Movimiento);
    const managerMovimientoEstado = manager.getRepository(Movimientoestado);
    const movimiento = await managerMovimiento.create({
      idexpediente,
      iddocumento,
      idusuarioemis,
      idusuariorecep,
      idareaemis,
      idarearecep,
    });
    await managerMovimiento.save(movimiento);
    const { idmovimiento } = movimiento;
    const movimientoEstado = await managerMovimientoEstado.create({
      idmovimiento,
      idestadomovimiento,
    });
    await managerMovimientoEstado.save(movimientoEstado);
    return movimiento;
  }

  async guardarDocumento(
    documento: Partial<DocumentoDTO>,
    usuario?,
    @TransactionManager() manager?: EntityManager,
    derivar: boolean = false,
    expediente?: Partial<ExpedienteDTO>,
  ): Promise<DocumentoRO> {
    /** Instanciar repositorios */
    const documentoRepository = manager.getRepository(Documento);
    const expedienteRepository = manager.getRepository(Expediente);
    const managerMovimiento = manager.getRepository(Movimiento);
    const managerMovimientoEstado = manager.getRepository(Movimientoestado);
    /** FIN */

    /** Documento */
    const documentoNuevo = documentoRepository.create({
      ...documento,
    });

    let nuevoExpediente = null;
    if (!derivar) {
      nuevoExpediente = expedienteRepository.create(expediente);
    }

    /**
     * Lógica Externo - Interno
     */
    const { idcategoriadocumento, idtipdoc, externo } = documento;
    const correlativo = await this.obtenerCorrelativo(
      idcategoriadocumento,
      idtipdoc,
      externo,
    );
    documentoNuevo.correlativo = correlativo;
    if (externo) {
      documentoNuevo.codigo = `${correlativo}-${new Date().getFullYear()}`;
    } else {
      const area = ['OAJ', 'UADAC', 'OGA']; //await this.getRequest('GET', 'area');
      const tipodoc = await this.tipoDocumentoRepository.findOne({
        where: { idtipodocumento: idtipdoc },
      });
      const escogido = {
        area: area[Math.floor(Math.random() * (3 - 0))],
      };
      documentoNuevo.codigo = `${
        tipodoc.abr
      } N° ${correlativo}-${new Date().getFullYear()}-${escogido.area}-MVES`;
    }
    /**
     * FIN
     */

    /**
     * GUARDAR DOCUMENTO Y EXPEDIENTE
     */
    const { iddocumento } = await documentoRepository.save(documentoNuevo);

    let idexpediente = null;
    if (!derivar) {
      idexpediente = await expedienteRepository.save(nuevoExpediente);
    }

    //let idexpediente;
    let idestadomovimiento;
    if (!derivar) {
      idestadomovimiento = await this.obtenerEstadoMovimiento(manager, 1);
    } else {
      idestadomovimiento = await this.obtenerEstadoMovimiento(manager, 2);
    }
    /** FIN */

    /** Movimiento */

    let movimiento = null;
    if (!derivar) {
      movimiento = await this.guardarMovimiento(
        idexpediente,
        iddocumento,
        usuario,
        idestadomovimiento,
        manager,
      );
    }
    this.documentoGateway.wss.emit('[DOCUMENTO] CREAR', {
      documentoNuevo,
      movimiento,
    });
    return documentoNuevo;
  }

  async obtenerEstadoMovimiento(
    @TransactionManager() manager: EntityManager,
    idestadomovimiento: number = 1,
  ) {
    const { idestadomovimiento: idestado } = await manager
      .getRepository(Estadomovimiento)
      .findOne({
        idestadomovimiento,
      });
    if (!idestado)
      throw new HttpException(
        `No se encontro el Estado `,
        HttpStatus.NOT_FOUND,
      );
    return idestado;
  }

  async obtenerCorrelativo(
    idcategoriadocumento?: number,
    idtipdoc?: number,
    externo: boolean = false,
  ): Promise<number> {
    let correlativo: number = 0;
    const qb = await this.documentoRepository.createQueryBuilder().limit(1);
    if (externo) {
      qb.where(
        'idcategoriadocumento = :idcategoriadocumento and externo = :externo',
        { idcategoriadocumento, externo },
      );
    } else {
      qb.where('idtipdoc = :idtipdoc and externo = :externo', {
        idtipdoc,
        externo: false,
      });
    }
    const ultimo = await qb
      .select(['correlativo', 'fecha'])
      .orderBy('fecha', 'DESC')
      .execute();
    if (ultimo.length === 0) return 1;
    const fecha: Date = ultimo[0].fecha;
    if (momenttz(fecha.getFullYear()).isAfter(new Date().getFullYear())) {
      correlativo = 0;
    }
    correlativo = ultimo[0] ? ultimo[0].correlativo : correlativo;
    correlativo++;
    return correlativo;
  }
}
