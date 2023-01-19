import {ExecutionContext, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "../services/auth.service";
import {extractTokenFromHeaders} from "../utils/rest-utils";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(private authService: AuthService) {
    super();
  }

  canActivate(context: ExecutionContext): Promise<boolean> {
    const bearerToken = extractTokenFromHeaders(context.switchToHttp().getRequest().headers);
    const payload = this.authService.verify(bearerToken);
    return new Promise((resolve, reject) => {
      payload ? resolve(true) : reject(false);
    });
  }
}
