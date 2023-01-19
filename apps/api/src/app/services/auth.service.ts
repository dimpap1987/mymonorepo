import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../interfaces/user';
import {
  JwtTokensInterface,
  RolesEnum,
  SessionInterface,
  UserJwtInterface,
} from '@mymonorepo/shared/interfaces';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtTokenService) {}

  createJwtToken(user: User): JwtTokensInterface {
    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);
    return {
      accessToken,
      refreshToken,
    };
  }

  createAccessToken(user: UserJwtInterface) {
    return this.signToken(user, 300); // 5 minutes
  }

  createRefreshToken(user: UserJwtInterface) {
    return this.signToken(user, 86400); // 1 day
  }

  verify(token): UserJwtInterface {
    try {
      return this.jwtService.verify(
        token,
        process.env.JWT_SECRET_KEY
      ) as UserJwtInterface;
    } catch (e) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
  }

  private signToken(user: UserJwtInterface, expiry) {
    try {
      return this.jwtService.sign(
        {
          ...user,
          roles: [RolesEnum.USER],
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: expiry }
      );
    } catch (err) {
      throw new InternalServerErrorException('createJwtToken', err.message);
    }
  }

  handleSessionRequest(bearerToken): SessionInterface {
    const user = this.jwtService.extractUser(bearerToken) as User;
    const accessToken = this.createAccessToken(user);
    return {
      accessToken: accessToken,
      expires: this.jwtService.extractExpiration(accessToken),
      user,
    };
  }

  handleRefreshTokenRequest(bearerToken): JwtTokensInterface {
    const user = this.jwtService.extractUser(bearerToken);
    return this.createJwtToken(user);
  }
}
