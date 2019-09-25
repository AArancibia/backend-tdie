import { Module, HttpModule } from '@nestjs/common';
import { ExpedienteController } from './expediente.controller';
import { ExpedienteService } from './expediente.service';
import { DocumentoController } from './documento/documento.controller';
import { DocumentoService } from './documento/documento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expediente } from './expediente.entity';
import { Documento } from './documento/documento.entity';
import { DocumentoexpedienteController } from './documentoexpediente/documentoexpediente.controller';
import { DocumentoexpedienteService } from './documentoexpediente/documentoexpediente.service';
//import { Documentoexpediente } from./documentoexpediente/documentoexpediente.entitysty';
import { TipodocumentoController } from './documento/tipodocumento/tipodocumento.controller';
import { TipodocumentoService } from './documento/tipodocumento/tipodocumento.service';
import { CategoriadocumentoController } from './documento/categoriadocumento/categoriadocumento.controller';
import { CategoriadocumentoService } from './documento/categoriadocumento/categoriadocumento.service';
import { Categoriadocumento } from './documento/categoriadocumento/categoriadocumento.entity';
import { Movimiento } from '../movimiento/movimiento.entity';
import { DocumentoResolver } from './documento/documento.resolver';
import { Tipodocumento } from './documento/tipodocumento/tipodocumento.entity';
import { DocumentoGateway } from 'src/gateways/documento.gateway';
import { DocumentoVista } from './documento/documentoview.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Expediente,
      Documento,
      //Documentoexpediente,
      Categoriadocumento,
      Movimiento,
      Tipodocumento,
      DocumentoVista,
    ]),
    HttpModule.register({
      baseURL: 'http://192.168.10.196/sistradoc/services/',
      // headers: {
      //   Authorization:
      //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzdWFyaW8iOjQsInVzZXJuYW1lIjoiYWFyYW5jaWJpYSIsImlhdCI6MTU2ODkxMzIzNCwiZXhwIjoxNTY4OTk5NjM0fQ.QsEXdtXq68CFTYleE4JBw2gCgexHl4-aGHQqkf743Ko',
      // },
      responseType: 'json',
    }),
  ],
  controllers: [
    ExpedienteController,
    DocumentoController,
    DocumentoexpedienteController,
    TipodocumentoController,
    CategoriadocumentoController,
  ],
  providers: [
    ExpedienteService,
    DocumentoService,
    DocumentoexpedienteService,
    TipodocumentoService,
    CategoriadocumentoService,
    DocumentoResolver,
    DocumentoGateway,
  ],
})
export class ExpedienteModule {}
