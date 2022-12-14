import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {TokenExpiredError} from "jsonwebtoken";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  handleRequest(err, user, info: Error) {
    if (info instanceof TokenExpiredError) {
      throw new HttpException({code: "TOKEN_EXPIRED"}, HttpStatus.FORBIDDEN)
    }
    return user;
  }
}
