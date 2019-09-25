import { Resolver, Query, Args } from '@nestjs/graphql';
import { DocumentoService } from './documento.service';
import { Logger } from '@nestjs/common';
import { Documento } from './documento.entity';

@Resolver('Documento')
export class DocumentoResolver {
  private logger = new Logger('DocumentoResolver');

  constructor(private readonly documentoService: DocumentoService) {}

  @Query(() => [Documento])
  async documento(
    @Args('correlativo') correlativo?: number,
    @Args('externo') externo?: boolean,
  ) {
    let filtros: any = {};
    filtros.correlativo = correlativo;
    filtros.externo = externo;
    for (const key in filtros) {
      if (filtros.hasOwnProperty(key)) {
        const element = filtros[key];
        if (filtros[key] == null) {
          Object.keys(filtros).map(item => delete filtros[key]);
        }
      }
    }
    for (const key in filtros) {
      this.logger.log(filtros[key]);
    }
    return await this.documentoService.obtenerDocumentos(filtros);
  }
}
