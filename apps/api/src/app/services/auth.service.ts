import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {User} from "../interfaces/user";
import {sign, verify} from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

@Injectable()
export class AuthService {

  async validateOAuthLogin(user: User, provider: Provider): Promise<string> {
    try {
      //TODO register user here
      return sign(
        {
          ...user,
          provider,
        }, process.env.JWT_SECRET_KEY, {expiresIn: 86400}); //1 day
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  verify(token) {
    return verify(token, process.env.JWT_SECRET_KEY);
  }
}
