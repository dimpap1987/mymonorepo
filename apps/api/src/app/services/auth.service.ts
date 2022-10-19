import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {GoogleUser} from "../interfaces/google-user";
import {sign, verify} from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google'
}

@Injectable()
export class AuthService {

  async validateOAuthLogin(user: GoogleUser, provider: Provider): Promise<string> {
    try {
      //TODO register user here
      return sign(
        {
          ...user,
          provider,
        }, process.env.JWT_SECRET_KEY, {expiresIn: 3600});
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  decodeJwt(token) {
    return verify(token, process.env.JWT_SECRET_KEY);
  }
}
