import { JwtPayloadInterface, JwtTokensInterface } from '@mymonorepo/shared/interfaces'
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { decode, sign, verify } from 'jsonwebtoken'

@Injectable()
export class JwtTokenService {
  extractPayloadWithoutExpAndIat(token: string): JwtPayloadInterface {
    const payload = decode(token) as JwtPayloadInterface
    delete payload['exp']
    delete payload['iat']
    return payload
  }

  extractPayload(token: string): JwtPayloadInterface {
    return decode(token) as JwtPayloadInterface
  }

  decodeComplete(token: string) {
    return decode(token, { complete: true })
  }

  extractExpiration(token: string) {
    return this.decodeComplete(token)?.payload?.['exp']
  }

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
      return verify(token, process.env.JWT_SECRET_KEY) as JwtPayloadInterface
    } catch (e) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
    }
  }

  private signToken(payload: JwtPayloadInterface, expiry) {
    try {
      return sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: expiry,
      })
    } catch (err) {
      throw new InternalServerErrorException('createJwtToken', err.message)
    }
  }
}
