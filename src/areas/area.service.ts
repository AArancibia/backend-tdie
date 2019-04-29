import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as request from 'request';
import { AreaDto, AreaRO } from './area.dto';
import { Repository } from 'typeorm';
import { AreaEntity } from './area.entity';

@Injectable()
export class AreaService {
  private logger = new Logger('AreaService');
  constructor(
    @InjectRepository( AreaEntity ) private areaService: Repository< AreaEntity >,
  ){}

  async getAreas(): Promise< AreaRO[] > {
    const areas: AreaRO[] = await this.areaService.find();
    return areas;
  }
}
