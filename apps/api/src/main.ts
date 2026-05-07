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

  // Serve static assets (JS, CSS, images, etc.)
  app.useStaticAssets(publicPath);

  // SPA fallback — must be registered BEFORE app.listen() so it sits
  // ahead of the NestJS router in the Express middleware stack.
  // Non-API, non-asset requests serve index.html for client-side routing.
  app.use((req: any, res: any, next: any) => {
    const p: string = req.path;
    if (p.startsWith('/api') || p.startsWith('/socket.io') || /\.\w+$/.test(p)) {
      return next();
    }
    res.sendFile(join(publicPath, 'index.html'), (err: any) => {
      if (err) next(err);
    });
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/api`);
}

bootstrap();
