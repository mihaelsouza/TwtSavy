require('dotenv').config({ path: '../.env' });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(process.env.NEST_PORT || 3001);
}

bootstrap();