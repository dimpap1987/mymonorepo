import {Controller, Get} from '@nestjs/common';

import {Message} from '@mymonorepo/api-interfaces';

import {AppService} from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }
}