import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  const port = process.env.PORT || 3333
  mongoose.set('debug', true)

  app.setGlobalPrefix(globalPrefix)
  app.use(cookieParser())

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })

  app.use(
    helmet({
      contentSecurityPolicy: false,
      // TODO need to fix that
      // contentSecurityPolicy: {
      //   directives: {
      //     defaultSrc: ["'self'"],
      //     scriptSrc: ["'self'"],
      //     styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
      //     styleSrcElem:["'self'"],
      //     imgSrc: ["'self'", 'data:', 'https://lh3.googleusercontent.com'],
      //     connectSrc: ["'self'"],
      //     fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      //     objectSrc: ["'self'"],
      //     mediaSrc: ["'self'"],
      //     frameSrc: ["'self'"],
      //   },
      // },
    })
  )

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
