import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity( 'area' )
export class AreaEntity {
  @PrimaryColumn({
    name: 'id_area',
  })
  idarea: number;
  @Column({
    name: 'desc_area',
  })
  descripcion: string;

  @Column({
    name: 'abreviatura',
  })
  abreviacion: string;
}
