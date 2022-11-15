import {verify} from 'jsonwebtoken';
import {Observable} from "rxjs";
import {CanActivate, Injectable} from "@nestjs/common";

@Injectable()
export class WsGuard implements CanActivate {
  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken = context.args[0].handshake.headers.authorization;
    try {
      const decoded = verify(bearerToken, process.env.JWT_SECRET_KEY);
      return new Promise((resolve, reject) => {
        decoded ? resolve(true) : reject(false);
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
