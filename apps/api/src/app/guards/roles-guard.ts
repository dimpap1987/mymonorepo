import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {RolesEnum} from "@mymonorepo/shared/interfaces";
import {AuthService} from "../services/auth.service";
import {extractTokenFromHeaders} from "../utils/rest-utils";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
              private authService: AuthService) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const bearerToken = extractTokenFromHeaders(context.switchToHttp().getRequest().headers);
    const user = this.authService.verify(bearerToken);

    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
