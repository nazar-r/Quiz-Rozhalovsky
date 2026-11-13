import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN
      ? [process.env.CORS_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173']
      : true,
  });
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
