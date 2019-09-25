import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimientoestado } from './movimientoestado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovimientoestadoService {
  constructor(
    @InjectRepository(Movimientoestado)
    private movimientoEstadoRepository: Repository<Movimientoestado>,
  ) {}

  async guardarMovimientoEstado(
    idmovimiento: number,
    idestadomovimiento: number,
  ): Promise<any> {
    const movimientoEstado = await this.movimientoEstadoRepository.create({
      idmovimiento,
      idestadomovimiento,
    });
    await this.movimientoEstadoRepository.save(movimientoEstado);
    return movimientoEstado;
  }
}
