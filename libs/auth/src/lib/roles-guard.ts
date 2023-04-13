import { RolesEnum } from '@mymonorepo/shared/interfaces'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthService } from './services/auth.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) return true

    const accessToken = context.switchToHttp().getRequest().cookies['accessToken']
    const payload = this.authService.verify(accessToken)

    return requiredRoles.some(role => payload.user?.roles?.includes(role))
  }
}
