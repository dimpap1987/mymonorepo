import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = process.env.PORT || 3333;
  
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(helmet());

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
