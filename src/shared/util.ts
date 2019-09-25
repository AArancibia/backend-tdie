import * as moment from 'moment-timezone';

export const formatFechaCorta = (fecha?: any) => {
  const fechaFormateada = moment(fecha ? fecha : new Date())
    .tz('America/Lima')
    .format('YYYY-MM-DD');
  return fechaFormateada;
};

export const formatFechaLarga = (fecha?: any) => {
  const fechaFormateada = moment(fecha ? fecha : new Date())
    .tz('America/Lima')
    .format('YYYY-MM-DD HH:mm:ss:SSS');
  return fechaFormateada;
};

export const formatHora = (fecha?: any) => {
  const fechaFormateada = moment(fecha ? fecha : new Date())
    .tz('America/Lima')
    .format('HH:mm:SS');
  return fechaFormateada;
};

export const formatFechaAdd = (
  fecha: any = new Date(),
  add?: any,
  type?: any,
) => {
  const fechaFormateada = moment(fecha)
    .add(add, type)
    .tz('America/Lima')
    .format('YYYY-MM-DD');
  return fechaFormateada;
};

export const filtrosDocumento = filtros => {
  for (const key in filtros) {
    if (filtros.hasOwnProperty(key)) {
      const element = filtros[key];
      if (filtros[key] == null) {
        Object.keys(filtros).map(item => delete filtros[key]);
      }
    }
  }
};
