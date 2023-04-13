import { JwtTokenService } from '@mymonorepo/jwt-utils'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtTokenService: JwtTokenService) {
    super()
  }

  canActivate(context: ExecutionContext): Promise<boolean> {
    const accessToken = context.switchToHttp().getRequest().cookies['accessToken']
    const payload = this.jwtTokenService.verify(accessToken)
    return new Promise((resolve, reject) => {
      payload ? resolve(true) : reject(false)
    })
  }
}
