import 'reflect-metadata';
import 'dotenv/config';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  app.setGlobalPrefix('api');

  const publicPath = join(__dirname, '..', 'public');
  app.useStaticAssets(publicPath);

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/api`);

  // SPA fallback: must be registered after listen() so it sits after
  // all NestJS routes — serves index.html for any unmatched path
  app.getHttpAdapter().getInstance().get('*', (_req: any, res: any) => {
    res.sendFile(join(publicPath, 'index.html'));
  });
}

bootstrap();
