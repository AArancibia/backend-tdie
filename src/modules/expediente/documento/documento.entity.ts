import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Tipodocumento } from './tipodocumento/tipodocumento.entity';
//import { Documentoexpediente } from '../documentoexpediente/documentoexpediente.entitys';
import { Movimiento } from 'src/modules/movimiento/movimiento.entity';
import { Categoriadocumento } from './categoriadocumento/categoriadocumento.entity';

@Entity('documento')
export class Documento {
  @PrimaryGeneratedColumn('increment')
  iddocumento: number;

  @Column('int2', {
    name: 'idtipdoc',
    comment: 'Llave foranea de la tabla tipodocumento',
    nullable: true,
  })
  idtipdoc: number;

  @Column('varchar', {
    name: 'codigo',
    comment: 'codigo del documento',
    nullable: true,
  })
  codigo: string;

  @Column('varchar', {
    name: 'observacion',
    comment: 'Observaciòn del documento',
    nullable: true,
  })
  observacion: string;

  @Column('varchar', {
    name: 'descripcion',
    comment: 'Descripcion del documento',
    nullable: true,
  })
  descripcion!: string;

  @Column('int2', {
    name: 'folios',
    comment: 'Folios del documento',
    nullable: true,
  })
  folios!: number;

  @CreateDateColumn()
  fecha!: Date | string;

  @Column('int2', {
    name: 'idcategoriadocumento',
    comment: 'Categoria del documento',
    nullable: true,
  })
  idcategoriadocumento: number;

  @Column('bigint', {
    name: 'correlativo',
    comment: 'Correlativo del documento',
    nullable: true,
  })
  correlativo: number;

  @Column('boolean', {
    name: 'externo',
    comment: 'Campo para verificar si es un documento externo',
    nullable: true,
    default: false,
  })
  externo: boolean;

  @ManyToOne(
    type => Categoriadocumento,
    categoriadocumento => categoriadocumento,
  )
  @JoinColumn({ name: 'idcategoriadocumento' })
  categoriadocumento: Categoriadocumento;

  @ManyToOne(type => Tipodocumento, tipodocumento => tipodocumento.documentos)
  @JoinColumn({ name: 'idtipdoc' })
  tipodocumento: Tipodocumento;

  // @OneToMany(
  //   type => Documentoexpediente,
  //   documentoexpediente => documentoexpediente.documento,
  // )
  // documentoexpediente: Documentoexpediente;

  @OneToMany(type => Movimiento, movimiento => movimiento.documento)
  movimientos: Movimiento[];
}
