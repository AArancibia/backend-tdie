import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpedienteModule } from './modules/expediente/expediente.module';
import { MovimientoModule } from './modules/movimiento/movimiento.module';
import { AppGateway } from './gateways/app.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ExpedienteModule,
    MovimientoModule,
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   debug: false,
    //   playground: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
