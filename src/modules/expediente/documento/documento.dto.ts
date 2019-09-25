export interface DocumentoDTO {
  folios: number;
  idtipdoc?: number;
  idcategoriadocumento?: number;
  sumilla?: string;
  asunto?: string;
  observacion?: string;
  externo?: boolean;
}

export interface DocumentoRO {
  iddocumento: number;
  idtipdoc: number;
  folios: number;
  idcategoriadocumento: number;
  sumilla?: string;
  asunto?: string;
  observacion?: string;
  externo?: boolean;
  correlativo: number;
  fecha: Date | string;
  codigo: string;
}
