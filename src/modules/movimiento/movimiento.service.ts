import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimiento } from './movimiento.entity';
import {
  Repository,
  Transaction,
  TransactionManager,
  EntityManager,
} from 'typeorm';
import { Estadomovimiento } from './estadomovimiento/estadomovimiento.entity';
import { MovimientoestadoService } from './movimientoestado/movimientoestado.service';
import { Movimientoestado } from './movimientoestado/movimientoestado.entity';

@Injectable()
export class MovimientoService {
  private logger = new Logger('MovimientoService');
  constructor(
    @InjectRepository(Movimiento)
    private movimientoRepository: Repository<Movimiento>,
    @InjectRepository(Estadomovimiento)
    private estadoMovimientoRepository: Repository<Estadomovimiento>,
    @InjectRepository(Movimientoestado)
    private movimientoEstadoRepository: Repository<Movimientoestado>,
    private movimientoEstadoService: MovimientoestadoService,
  ) {}

  async guardarMovimiento(
    { iddocumento, idexpediente, idestadomovimiento },
    @TransactionManager() manager: EntityManager,
  ): Promise<any> {
    const managerMovimiento = manager.getRepository(Movimiento);
    const managerMovimientoEstado = manager.getRepository(Movimientoestado);
    const estadoMovimiento = await manager
      .getRepository(Estadomovimiento)
      .findOne({
        idestadomovimiento,
      });
    if (!estadoMovimiento)
      throw new HttpException(
        `No se encontro el Estado `,
        HttpStatus.NOT_FOUND,
      );
    const movimiento = await managerMovimiento.create({
      idexpediente,
      iddocumento,
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
}
