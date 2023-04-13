import {
  JwtPayloadInterface,
  JwtTokensInterface,
  ProvidersEnum,
  SessionInterface,
} from '@mymonorepo/shared/interfaces'
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { JwtTokenService } from 'libs/jwt-utils/src/lib/jwt-token.service'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtTokenService) {}

  createJwtToken(payload: JwtPayloadInterface): JwtTokensInterface {
    const accessToken = this.createAccessToken(payload)
    const refreshToken = this.createRefreshToken(payload)
    return {
      accessToken,
      refreshToken,
    }
  }

  createAccessToken(payload: JwtPayloadInterface) {
    return this.signToken(payload, 300 * 5) // 5 minutes
  }

  createRefreshToken(payload: JwtPayloadInterface) {
    return this.signToken(payload, 86400) // 1 day
  }

  verify(token): JwtPayloadInterface {
    try {
      return this.jwtService.verify(token, process.env.JWT_SECRET_KEY) as JwtPayloadInterface
    } catch (e) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
    }
  }

  private signToken(payload: JwtPayloadInterface, expiry) {
    try {
      return this.jwtService.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: expiry,
      })
    } catch (err) {
      throw new InternalServerErrorException('createJwtToken', err.message)
    }
  }

  handleSessionRequest(bearerToken): SessionInterface {
    const payload = this.jwtService.extractPayloadWithoutExpAndIat(bearerToken)
    return {
      user: payload.user,
    }
  }

  handleRefreshTokenRequest(bearerToken): JwtTokensInterface {
    this.verify(bearerToken)
    const payload = this.jwtService.extractPayloadWithoutExpAndIat(bearerToken)
    return this.createJwtToken(payload)
  }

  handleLogin(userFromProvider, provider: ProvidersEnum): JwtTokensInterface {
    // TODO fetch user from db
    const user = {
      ...userFromProvider,
      roles: ['USER'],
      provider: provider,
    }
    return this.createJwtToken({ user: user })
  }
}
