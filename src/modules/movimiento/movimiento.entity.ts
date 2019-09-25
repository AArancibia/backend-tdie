import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Documento } from '../expediente/documento/documento.entity';
import { Expediente } from '../expediente/expediente.entity';
import { Movimientoestado } from './movimientoestado/movimientoestado.entity';
import { Estadomovimiento } from './estadomovimiento/estadomovimiento.entity';

@Entity('movimiento')
export class Movimiento {
  @PrimaryGeneratedColumn('increment')
  idmovimiento: number;

  @Column('int8', {
    name: 'iddocumento',
    comment: 'Llave foranea del movimiento',
  })
  iddocumento: number;

  @Column('int8', {
    name: 'idexpediente',
    comment: 'Llave foranea del Expediente',
  })
  idexpediente: number;

  @Column('int8', {
    name: 'idareaemis',
    comment: 'Llave foranea de tabla Area de la BD Recursos',
    nullable: true,
  })
  idareaemis: number;

  @Column('int8', {
    name: 'idarearecep',
    comment: 'Llave foranea de tabla Area de la BD Recursos',
    nullable: true,
  })
  idarearecep: number;

  @Column('int8', {
    name: 'idusuarioemis',
    comment: 'Llave foranea de tabla Usuario de la BD Recursos',
    nullable: true,
  })
  idusuarioemis: number;

  @Column('int8', {
    name: 'idusuariorecep',
    comment: 'Llave foranea de tabla Usuario de la BD Recursos',
    nullable: true,
  })
  idusuariorecep: number;

  @ManyToOne(type => Documento, documento => documento.movimientos)
  @JoinColumn({ name: 'iddocumento' })
  documento: Documento;

  @ManyToOne(type => Expediente, expediente => expediente.movimientos)
  @JoinColumn({ name: 'idexpediente' })
  expediente: Expediente;

  @OneToMany(
    type => Movimientoestado,
    movimientoestado => movimientoestado.movimiento,
  )
  movimientoestado: Movimientoestado[];

  // @ManyToMany(type => Estadomovimiento)
  // @JoinTable()
  // detalle: Estadomovimiento[];
}
