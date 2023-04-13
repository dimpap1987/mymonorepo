import {
  JwtPayloadInterface,
  JwtTokensInterface,
  ProvidersEnum,
  SessionInterface,
} from '@mymonorepo/shared/interfaces'
import { UserService } from '@mymonorepo/user'
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { JwtTokenService } from 'libs/jwt-utils/src/lib/jwt-token.service'
import { User } from 'libs/user/src/lib/schemas/user-schema'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtTokenService, private userService: UserService) {}

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

  async handleLogin(
    user: any,
    provider: ProvidersEnum,
    accessTokenGithub?: string
  ): Promise<JwtTokensInterface> {
    const loggedUser = await this.handleUser(user)
    this.handleSocialProvider(user.profileId, loggedUser.id, provider)

    return this.createJwtToken({
      user: {
        id: loggedUser.id,
        username: loggedUser.username,
        email: loggedUser.email,
        createdAt: loggedUser.createdAt,
        lastLoggedIn: loggedUser.lastLoggedIn,
        roles: loggedUser.roles,
        accessTokenGithub: accessTokenGithub,
        provider: provider,
        picture: user.picture,
      },
    })
  }

  private async handleUser(user: User) {
    let newUser = await this.userService.getUserByEmail(user.email)

    if (!newUser) {
      newUser = await this.userService.createUser({
        ...user,
        roles: ['USER'],
        lastLoggedIn: new Date().toLocaleString(),
      })
    } else {
      const lastLoggedIn = new Date().toLocaleString()
      newUser.lastLoggedIn = lastLoggedIn

      this.userService.updateUser(newUser.id, {
        lastLoggedIn: lastLoggedIn,
      })
    }

    return newUser
  }

  private async handleSocialProvider(profileId: string, userId: string, provider: string) {
    //TODO
    return null
  }
}
