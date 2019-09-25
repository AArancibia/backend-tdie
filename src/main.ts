import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/sistradoc');
  await app.listen(3031);
  Logger.log(`Server running on http://localhost:${ 3031 }/api/sistradoc`, 'Bootstrap');
}
bootstrap();
