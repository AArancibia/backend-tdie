import { Controller, Post, Body, Logger, Get } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoDTO } from './documento.dto';
import { ExpedienteDTO } from '../expediente.dto';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';

@Controller('documento')
export class DocumentoController {
  private logger = new Logger('DocumentoController');

  constructor(private documentoService: DocumentoService) {}

  @Get()
  @Transaction({ connectionName: 'default' })
  async obtenerDocumentos(
    @Body() filtros?: any,
    @TransactionManager() manager?: EntityManager,
  ) {
    return await this.documentoService.obtenerDocumentos(filtros, manager);
  }

  @Post()
  @Transaction({ connectionName: 'default' })
  async guardarDocumento(
    @Body('documento') documento: Partial<DocumentoDTO>,
    @Body('expediente') expediente: Partial<ExpedienteDTO>,
    @Body('usuario') usuario: any,
    @TransactionManager() manager: EntityManager,
  ) {
    return await this.documentoService.guardarDocumento(
      documento,
      usuario,
      manager,
      false,
      expediente,
    );
  }

  @Post('derivar')
  @Transaction({ connectionName: 'default' })
  async derivarDocumento(
    @Body('documento') documento: Partial<DocumentoDTO>,
    @Body('usuario') usuario: Partial<any>,
    @Body('movimiento') movimiento: any,
    @TransactionManager() manager: EntityManager,
  ) {
    return await this.documentoService.derivarDocumento(
      documento,
      usuario,
      movimiento,
      manager,
    );
  }

  @Get('vista')
  getVista(
    @Body() filtros?: any,
    @TransactionManager() manager?: EntityManager,
  ) {
    return this.documentoService.vista(filtros, manager);
  }

  @Post('correlativo')
  async obtenerCorrelativo(@Body()
  {
    idcategoriadocumento,
    idtipdoc,
    externo,
  }: any) {
    return this.documentoService.obtenerCorrelativo(
      idcategoriadocumento,
      idtipdoc,
      externo,
    );
  }
}
