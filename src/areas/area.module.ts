import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { AreaEntity } from './area.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature( [ AreaEntity ] ),
  ],
  controllers: [ AreaController ],
  providers: [ AreaService ],
})
export class AreaModule {}
