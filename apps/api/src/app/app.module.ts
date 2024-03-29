import { JwtPayloadInterface } from '@mymonorepo/shared/interfaces'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { APP_FILTER, REQUEST } from '@nestjs/core'

import { AuthController, AuthModule, RolesGuard } from '@mymonorepo/auth'
import { JwtTokenService } from '@mymonorepo/jwt-utils'
import { UserController, UserModule } from '@mymonorepo/user'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as session from 'express-session'
import { join } from 'path'
import { AppController } from './controllers/app.controller'
import { RemoteRepoController } from './controllers/remote-repo.controller'
import {
  ApiExceptionFilter,
  BadRequestExceptionFilter,
  GenericExceptionFilter,
  ValidationErrorFilter,
} from './exceptions/http-exception.filter'
import { WsGuard } from './guards/ws-guard'
import { CorsMiddleware } from './middlewares/cors.middleware'
import { CsrfGeneratorMiddleware } from './middlewares/csrf-generator.middleware'
import { CsrfValidatorMiddleware } from './middlewares/csrf-validator.middleware'
import { LoggerMiddleware } from './middlewares/logger.middleware'
import { RefererMiddleware } from './middlewares/referer.middleware'
import { AppService } from './services/app.service'
import { GithubService } from './services/github.service'
import { OctokitUtils } from './utils/octokit-utils'
const ENV = process.env.NODE_ENV

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', `.env.${ENV}`, `environments/.env.${ENV}`],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL, {
      auth: {
        username: process.env.MONGO_DB_USERNAME,
        password: process.env.MONGO_DB_PASSWORD,
      },
      authSource: process.env.MONGO_DB_AUTH_SOURCE,
    }),
    UserModule,
    AuthModule,
    //This is to bundle front-back together
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: [],
    }),
  ],
  controllers: [AppController, AuthController, UserController, RemoteRepoController],
  providers: [
    AppService,
    WsGuard,
    RolesGuard,
    JwtTokenService,
    GithubService,
    OctokitUtils,
    {
      provide: 'jwt',
      useFactory: async (jwtService: JwtTokenService, req: any): Promise<JwtPayloadInterface> => {
        return jwtService.extractPayload(req?.cookies['accessToken'])
      },
      inject: [JwtTokenService, REQUEST],
    },
    {
      provide: APP_FILTER,
      useClass: GenericExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
  ],
  exports: ['jwt'],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
        })
      )
      .forRoutes('*')
      .apply(CorsMiddleware)
      .forRoutes('/')
      .apply(CsrfValidatorMiddleware)
      .forRoutes('/')
      .apply(CsrfGeneratorMiddleware)
      .forRoutes('/')
      .apply(RefererMiddleware)
      .forRoutes(
        { path: '*google/login*', method: RequestMethod.GET },
        { path: '*github/login*', method: RequestMethod.GET },
        { path: '*facebook/login*', method: RequestMethod.GET }
      )
      .apply(LoggerMiddleware)
      .forRoutes('/')
  }
}
