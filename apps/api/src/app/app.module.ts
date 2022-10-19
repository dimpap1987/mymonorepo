import {Module} from '@nestjs/common';

import {AppController} from './controllers/app.controller';
import {AppService} from './services/app.service';
import {AuthService} from "./services/auth.service";
import {GoogleStrategy} from "./strategies/google-strategy";
import {AuthController} from "./controllers/auth.controller";
import {JwtStrategy} from "./strategies/jwt-strategy";
import {UserController} from "./controllers/user.controller";
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
    JwtStrategy
  ],
})
export class AppModule {
}
