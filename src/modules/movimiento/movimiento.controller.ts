import { Controller, Post, Body } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';

@Controller('movimiento')
export class MovimientoController {
  constructor(private movimientoService: MovimientoService) {}

  @Post()
  @Transaction({ connectionName: 'default' })
  guardarMovimiento(
    @Body() data: any,
    @TransactionManager() manager: EntityManager,
  ) {
    return this.movimientoService.guardarMovimiento(data, manager);
  }
}
