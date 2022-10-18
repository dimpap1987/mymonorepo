import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
