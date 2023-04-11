import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class RefererMiddleware implements NestMiddleware {
  use(req, res, next) {
    if (req.headers?.referer) {
      req.session['redirect-after-login'] = req.headers.referer
    }
    next()
  }
}
