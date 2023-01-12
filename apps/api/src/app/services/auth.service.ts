import {HttpException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
import {User} from "../interfaces/user";
import {sign, verify} from 'jsonwebtoken';
import {JwtTokensInterface, ProvidersEnum, UserJwtInterface} from "@mymonorepo/shared/interfaces";


@Injectable()
export class AuthService {

  createJwtToken(user: User, provider: ProvidersEnum): JwtTokensInterface {
    const accessToken = this.createAccessToken(user, provider);
    const refreshToken = this.createRefreshToken(user, provider);
    return {
      accessToken,
      refreshToken
    }
  }

  createAccessToken(user, provider: ProvidersEnum) {
    return AuthService.signToken(user, provider, 300)
  }

  createRefreshToken(user, provider: ProvidersEnum) {
    return AuthService.signToken(user, provider, 86400)
  }

  verify(token): UserJwtInterface {
    try {
      return verify(token, process.env.JWT_SECRET_KEY) as UserJwtInterface;
    } catch (e) {
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }
  }

  private static signToken({email, firstName, lastName, picture, profileId}, provider, expiry) {
    try {
      return sign(
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          picture: picture,
          profileId: profileId,
          provider,
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn: expiry}
      );
    } catch (err) {
      throw new InternalServerErrorException('createJwtToken', err.message);
    }
  }
}
