import { JwtPayloadInterface } from '@mymonorepo/shared/interfaces'
import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'

import { UserController, UserModule } from '@mymonorepo/user'
import { MongooseModule } from '@nestjs/mongoose'
import * as session from 'express-session'
import { AppController } from './controllers/app.controller'
import { AuthController } from './controllers/auth.controller'
import { RemoteRepoController } from './controllers/remote-repo.controller'
import { RolesGuard } from './guards/roles-guard'
import { WsGuard } from './guards/ws-guard'
import { CorsMiddleware } from './middlewares/cors.middleware'
import { CsrfGeneratorMiddleware } from './middlewares/csrf-generator.middleware'
import { CsrfValidatorMiddleware } from './middlewares/csrf-validator.middleware'
import { LoggerMiddleware } from './middlewares/logger.middleware'
import { RefererMiddleware } from './middlewares/referer.middleware'
import { AppService } from './services/app.service'
import { AuthService } from './services/auth.service'
import { GithubService } from './services/github.service'
import { JwtTokenService } from './services/jwt-token.service'
import { UserSessionCache } from './services/user-session-cache'
import { FacebookStrategy } from './strategies/facebook-strategy'
import { GithubOauthStrategy } from './strategies/github-strategy'
import { GoogleStrategy } from './strategies/google-strategy'
import { OctokitUtils } from './utils/octokit-utils'
import { AppGateway } from './websocket/app.gateway'
// import {ServeStaticModule} from '@nestjs/serve-static';
// import {join} from 'path';
// import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost/${process.env.MONGO_DB_SCHEMA}`, {
      auth: {
        username: process.env.MONGO_DB_USERNAME,
        password: process.env.MONGO_DB_PASSWORD,
      },
      authSource: process.env.MONGO_DB_AUTH_SOURCE,
    }),
    UserModule,
    //This is to bundle front-back together
    // ConfigModule.forRoot(),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client'),
    //   exclude: [],
    // })
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, AuthController, UserController, RemoteRepoController],
  providers: [
    AppService,
    AuthService,
    GoogleStrategy,
    FacebookStrategy,
    GithubOauthStrategy,
    AppGateway,
    UserSessionCache,
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
      // .apply(CsrfValidatorMiddleware)
      // .forRoutes('/')
      // .apply(CsrfGeneratorMiddleware)
      // .forRoutes('/')
      .apply(RefererMiddleware)
      .forRoutes('/')
      .apply(LoggerMiddleware)
      .forRoutes('/')
  }
}
