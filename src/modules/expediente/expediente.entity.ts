import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
//import { Documentoexpediente } from './documentoexpediente/documentoexpediente.entitys';
import { Movimiento } from '../movimiento/movimiento.entity';

@Entity('expediente')
export class Expediente {
  @PrimaryGeneratedColumn('increment')
  idexpediente: number;

  @Column('int4', {
    name: 'idtramite',
    comment: 'Llave foranea de la tabla tramite de la BD tupa',
  })
  idtramite: number;

  @Column('int8', {
    name: 'idadministrado',
    comment:
      'Llave foranea de la tabla administrado de la BD plataformacolasdb',
  })
  idadministrado: number;

  @Column('int8', {
    name: 'administrado',
    comment: 'Datos del Administrado',
    nullable: true,
  })
  administrado: string;

  @CreateDateColumn()
  fecha: Date | string;

  // @OneToMany(
  //   type => Documentoexpediente,
  //   documentoexpediente => documentoexpediente.expediente,
  // )
  // documentoexpediente: Documentoexpediente;

  @OneToMany(type => Movimiento, movimiento => movimiento.expediente)
  movimientos: Movimiento[];
}
