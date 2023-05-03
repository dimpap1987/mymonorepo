import { JwtTokenService } from '@mymonorepo/jwt-utils'
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtTokenService) {}

  use(req, res, next) {
    const { method, path: url } = req
    const username = this.jwtService.extractPayload(req.cookies['accessToken'])?.user?.username
    const userAgent = req.get('user-agent') || ''

    res.on('close', () => {
      const { statusCode } = res
      const usernameLog = `${username ? ` - username: '${username}'` : ''}`
      const remoteIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.ip

      Logger.log(
        `- ${method} ${url} - status code: '${statusCode}' - agent: '${userAgent}' - x-forwarded-for: '${remoteIp}'${usernameLog}`
      )
    })
    next()
  }
}
