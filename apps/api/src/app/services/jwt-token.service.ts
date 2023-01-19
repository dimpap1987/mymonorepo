import { Injectable } from '@nestjs/common';
import { sign, verify, decode, SignOptions } from 'jsonwebtoken';
import { User } from '../interfaces/user';

@Injectable()
export class JwtTokenService {
  extractUser(token: string): User {
    const payload = decode(token) as User;
    delete payload['exp'];
    delete payload['iat'];
    return payload;
  }

  decodeComplete(token: string) {
    return decode(token, { complete: true });
  }

  extractExpiration(token: string) {
    return this.decodeComplete(token)?.payload?.['exp'];
  }

  sign(payload, secret, options: SignOptions) {
    return sign(payload, secret, options);
  }

  verify(token, secret) {
    return verify(token, secret);
  }
}
