import 'reflect-metadata';
import 'dotenv/config';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SpaFilter } from './spa.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  app.useGlobalFilters(new SpaFilter());

  app.setGlobalPrefix('api');

  app.useStaticAssets(join(__dirname, '..', 'public'));

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/api`);
}

bootstrap();
