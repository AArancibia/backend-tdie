import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreaModule } from './areas/area.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AreaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
