import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Movimientoestado } from '../movimientoestado/movimientoestado.entity';
import { Movimiento } from '../movimiento.entity';

@Entity('estadomovimiento')
export class Estadomovimiento {
  @PrimaryGeneratedColumn('increment')
  idestadomovimiento: number;

  @Column('varchar', {
    name: 'descripcion',
    comment: 'Descripcion del estado movimiento',
  })
  descripcion: string;

  @OneToMany(
    type => Movimientoestado,
    movimientoestado => movimientoestado.estadomovimiento,
  )
  movimientoestado: Movimiento[];

  // @ManyToMany(type => Movimiento)
  // movimientoestado: Movimiento[];
}
