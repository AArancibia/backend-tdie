import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { Documento } from './documento.entity';
import { Movimiento } from 'src/modules/movimiento/movimiento.entity';
import { Expediente } from '../expediente.entity';
import { Movimientoestado } from 'src/modules/movimiento/movimientoestado/movimientoestado.entity';

@ViewEntity({
  name: 'documentovista',
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select([
        'documento.*',
        'movimiento.idareaemis as idareaemis',
        'movimiento.idarearecep as idarearecep',
        'expediente.idexpediente as idexpediente',
        'expediente.idtramite as idtramite',
        'expediente.idadministrado as idadministrado',
        'expediente.administrado as administrado',
        'movimientoestado.idestadomovimiento as idestadomovimiento',
        'movimientoestado.idmovimiento as idmovimiento',
        'movimientoestado.fecha as movimientoestadofecha',
      ])
      .from(Documento, 'documento')
      .leftJoin(
        Movimiento,
        'movimiento',
        'documento.iddocumento = movimiento.iddocumento',
      )
      .leftJoin(
        Expediente,
        'expediente',
        'expediente.idexpediente = movimiento.idexpediente',
      )
      .leftJoin(
        Movimientoestado,
        'movimientoestado',
        'movimientoestado.idmovimiento = movimiento.idmovimiento',
      ),
})
export class DocumentoVista {
  @ViewColumn()
  iddocumento: number;

  @ViewColumn()
  codigo: string;

  @ViewColumn()
  descripcion: string;

  @ViewColumn()
  idtipdoc: number;

  @ViewColumn()
  fecha: Date | string;

  @ViewColumn()
  folios: number;

  @ViewColumn()
  correlativo: number;

  @ViewColumn()
  idarearecep: number;

  @ViewColumn()
  idareaemis: number;

  @ViewColumn()
  idexpediente: number;

  @ViewColumn()
  idtramite: number;

  @ViewColumn()
  idadministrado: number;

  @ViewColumn()
  administrado: string;

  @ViewColumn()
  idestadomovimiento: number;

  @ViewColumn()
  idmovimiento: number;

  @ViewColumn()
  movimientoestadofecha: number;
}
