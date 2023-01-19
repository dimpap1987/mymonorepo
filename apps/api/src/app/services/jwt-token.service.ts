import { JwtPayloadInterface } from '@mymonorepo/shared/interfaces';
import { Injectable } from '@nestjs/common';
import { decode, sign, SignOptions, verify } from 'jsonwebtoken';

@Injectable()
export class JwtTokenService {

  extractPayloadWithoutExpAndIat(token: string): JwtPayloadInterface {
    const payload = decode(token) as JwtPayloadInterface;
    delete payload['exp'];
    delete payload['iat'];
    return payload;
  }

  extractPayload(token: string): JwtPayloadInterface {
    return decode(token) as JwtPayloadInterface;
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
