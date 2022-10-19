import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {GoogleUser} from "../interfaces/google-user";

@Injectable()
export class AuthService {

  googleLogin({user}) {
    if (!user) throw new HttpException({}, HttpStatus.FORBIDDEN);

    const googleUser = user as GoogleUser;
    //TODO save in database
    return {
      user: googleUser
    }
  }
}
