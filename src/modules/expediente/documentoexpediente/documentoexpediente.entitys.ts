import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Documento } from '../documento/documento.entity';
import { Expediente } from '../expediente.entity';

@Entity('documentoexpediente')
export class Documentoexpediente {
  @Column('int8', {
    name: 'expedienteIdexpediente',
    comment: 'Llave primaria de Idexpediente',
    primary: true,
  })
  expedienteIdexpediente: number;

  @Column('int8', {
    name: 'documentoIddocumento',
    comment: 'Llave primaria de Documento',
    primary: true,
  })
  documentoIddocumento: number;

  @ManyToOne(type => Documento, documento => documento)
  @JoinColumn({ name: 'documentoIddocumento' })
  documento!: Documento;

  @ManyToOne(type => Expediente, expediente => expediente, { eager: true })
  @JoinColumn({ name: 'expedienteIdexpediente' })
  expediente!: Expediente;
}
