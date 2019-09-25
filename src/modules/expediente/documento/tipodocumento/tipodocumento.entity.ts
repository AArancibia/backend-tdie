import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Documento } from '../documento.entity';

@Entity('tipodocumento')
export class Tipodocumento {
  @PrimaryGeneratedColumn('increment')
  idtipodocumento: number;

  @Column('varchar', {
    name: 'nombre',
    comment: 'Nombre del tipo del documento',
  })
  nombre!: string;

  @Column('varchar', {
    name: 'abr',
    comment: 'Abreviatura del tipo del documento',
  })
  abr!: string;

  @OneToMany(type => Documento, documento => documento.tipodocumento, {
    eager: false,
  })
  documentos: Documento[] | null;
}
