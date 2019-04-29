import { Controller, Get, Logger } from '@nestjs/common';
import { AreaService } from './area.service';

@Controller('areas')
export class AreaController {
  private logger = new Logger('IdeaController');
  constructor(
    private areaService: AreaService,
  ){}

  @Get()
  async getAreas() {
    return this.areaService.getAreas();
  }
}
