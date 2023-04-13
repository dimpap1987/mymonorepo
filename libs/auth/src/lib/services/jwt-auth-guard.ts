import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../services/auth.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super()
  }

  canActivate(context: ExecutionContext): Promise<boolean> {
    const accessToken = context.switchToHttp().getRequest().cookies['accessToken']
    const payload = this.authService.verify(accessToken)
    return new Promise((resolve, reject) => {
      payload ? resolve(true) : reject(false)
    })
  }
}
