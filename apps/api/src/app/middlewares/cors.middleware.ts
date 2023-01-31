import { Injectable, NestMiddleware } from '@nestjs/common';

const headers = ['Content-Type', 'X-XSRF-TOKEN'].join(',');

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.UI_URL);
    res.header('Access-Control-Allow-Headers', headers);
    res.header('Access-Control-Expose-Headers', headers);
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
  }
}
