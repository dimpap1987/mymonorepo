import {HttpException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
import {User} from "../interfaces/user";
import {sign, verify} from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {

  async createJwtToken(user: User, provider: Provider): Promise<JwtTokens> {
    const accessToken = await this.createAccessToken(user, provider);
    const refreshToken = await this.createRefreshToken(user, provider);
    return {
      accessToken,
      refreshToken
    }
  }

  async createAccessToken(user, provider: Provider) {
    return AuthService.signToken(user, provider, 300)
  }

  async createRefreshToken(user, provider: Provider) {
    return AuthService.signToken(user, provider, 86400)
  }

  verify(token) {
    try {
      return verify(token, process.env.JWT_SECRET_KEY);
    } catch (e) {
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }
  }

  private static async signToken({email, firstName, lastName, picture, profileId}, provider, expiry) {
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
