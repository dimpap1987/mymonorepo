import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AppController } from './controllers/app.controller'
import { AuthController } from './controllers/auth.controller'
import { UserController } from './controllers/user.controller'
import { CorsMiddleware } from './middlewares/cors.middleware'
import { RolesGuard } from './guards/roles-guard'
import { WsGuard } from './guards/ws-guard'
import { AppService } from './services/app.service'
import { AuthService } from './services/auth.service'
import { JwtTokenService } from './services/jwt-token.service'
import { UserSessionCache } from './services/user-session-cache'
import { FacebookStrategy } from './strategies/facebook-strategy'
import { GoogleStrategy } from './strategies/google-strategy'
import { AppGateway } from './websocket/app.gateway'
import { CsrfValidatorMiddleware } from './middlewares/csrf-validator.middleware'
import { CsrfGeneratorMiddleware } from './middlewares/csrf-generator.middleware'
// import {ServeStaticModule} from '@nestjs/serve-static';
// import {join} from 'path';
// import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
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
  controllers: [AppController, AuthController, UserController],
  providers: [
    AppService,
    AuthService,
    GoogleStrategy,
    FacebookStrategy,
    AppGateway,
    UserSessionCache,
    WsGuard,
    RolesGuard,
    JwtTokenService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes('/')
      .apply(CsrfValidatorMiddleware)
      .forRoutes('/')
      .apply(CsrfGeneratorMiddleware)
      .forRoutes('/')
  }
}
