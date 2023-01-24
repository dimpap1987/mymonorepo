import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { AppModule } from './app/app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = process.env.PORT || 3333;
  const csrfProtection = csurf({ cookie: { sameSite: true } });

  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: [process.env.UI_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'X-CSRF-TOKEN'],
    exposedHeaders: ['Content-Type', 'X-CSRF-TOKEN'],
    credentials: true,
    maxAge: 3600,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use(cookieParser());
  app.use(csrfProtection);
  app.use(helmet());

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
