import {CacheModule, Module} from '@nestjs/common';

import {AppController} from './controllers/app.controller';
import {AppService} from './services/app.service';
import {AuthService} from "./services/auth.service";
import {GoogleStrategy} from "./strategies/google-strategy";
import {AuthController} from "./controllers/auth.controller";
import {JwtStrategy} from "./strategies/jwt-strategy";
import {UserController} from "./controllers/user.controller";
import {FacebookStrategy} from "./strategies/facebook-strategy";
import {AppGateway} from "./websocket/app.gateway";
import {UserSessionCache} from "./services/user-session-cache";
import {WsGuard} from "./guards/ws-guard";
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
      isGlobal: true
    })
  ],
  controllers: [
    AppController,
    AuthController,
    UserController
  ],
  providers: [
    AppService,
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    FacebookStrategy,
    AppGateway,
    UserSessionCache,
    WsGuard
  ],
})
export class AppModule {
}
