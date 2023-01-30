import { Injectable, NestMiddleware } from '@nestjs/common';

const headers = ['Content-Type', 'X-XSRF-TOKEN'];

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', headers);
    res.header('Access-Control-Expose-Headers', headers);
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
  }
}
