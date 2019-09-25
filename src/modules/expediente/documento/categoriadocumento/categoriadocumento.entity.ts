import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Documento } from '../documento.entity';

@Entity('categoriadocumento')
export class Categoriadocumento {
  @PrimaryGeneratedColumn('increment')
  idcategoriadocumento: number;

  @Column('varchar', {
    name: 'descripcion',
    comment: 'Descripcio de la categoria del documento',
  })
  descripcion: string;

  @OneToMany(type => Documento, documento => documento.categoriadocumento)
  documento: Documento[];
}
