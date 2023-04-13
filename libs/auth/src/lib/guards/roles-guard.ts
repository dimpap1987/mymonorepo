import { JwtTokenService } from '@mymonorepo/jwt-utils'
import { RolesEnum } from '@mymonorepo/shared/interfaces'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtTokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) return true

    const accessToken = context.switchToHttp().getRequest().cookies['accessToken']
    const payload = this.jwtService.verify(accessToken)

    return requiredRoles.some(role => payload.user?.roles?.includes(role))
  }
}
