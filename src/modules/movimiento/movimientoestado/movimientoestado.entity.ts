import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Estadomovimiento } from '../estadomovimiento/estadomovimiento.entity';
import { Movimiento } from '../movimiento.entity';

@Entity('movimiento_detalle_estadomovimiento')
export class Movimientoestado {
  @Column('int8', {
    //name: 'estadomovimientoIdestadomovimiento',
    comment: 'Llave foranea de la tabla EstadoMovimiento',
    primary: true,
  })
  idestadomovimiento: number;

  @Column('int8', {
    //name: 'movimientoIdmovimiento',
    comment: 'Llave foranea de la tabla Movimiento',
    primary: true,
  })
  idmovimiento: number;

  @ManyToOne(
    type => Estadomovimiento,
    estadomovimiento => estadomovimiento.movimientoestado,
    { persistence: false },
  )
  @JoinColumn({
    name: 'idestadomovimiento',
  })
  estadomovimiento: Estadomovimiento;

  @ManyToOne(type => Movimiento, movimiento => movimiento.movimientoestado, {
    persistence: false,
  })
  @JoinColumn({
    name: 'idmovimiento',
  })
  movimiento: Movimiento;

  @CreateDateColumn()
  fecha: Date;
}
