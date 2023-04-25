import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

@Injectable()
export class RefererMiddleware implements NestMiddleware {
  use(req, res, next) {
    const referer = req.headers?.referer

    Logger.log(`Referer set for 'redirect-after-login' with value: ${referer}`)
    req.session['redirect-after-login'] = referer

    next()
  }
}
