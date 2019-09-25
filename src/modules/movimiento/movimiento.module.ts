import { Module } from '@nestjs/common';
import { MovimientoController } from './movimiento.controller';
import { MovimientoService } from './movimiento.service';
import { EstadomovimientoService } from './estadomovimiento/estadomovimiento.service';
import { EstadomovimientoController } from './estadomovimiento/estadomovimiento.controller';
import { MovimientoestadoService } from './movimientoestado/movimientoestado.service';
import { MovimientoestadoController } from './movimientoestado/movimientoestado.controller';
import { Movimiento } from './movimiento.entity';
import { Estadomovimiento } from './estadomovimiento/estadomovimiento.entity';
import { Movimientoestado } from './movimientoestado/movimientoestado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimiento, Estadomovimiento, Movimientoestado]),
  ],
  controllers: [
    MovimientoController,
    EstadomovimientoController,
    MovimientoestadoController,
  ],
  providers: [
    MovimientoService,
    EstadomovimientoService,
    MovimientoestadoService,
  ],
})
export class MovimientoModule {}
