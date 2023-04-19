import { ApiException } from '@mymonorepo/back-end-utils'
import { JwtTokensInterface, ProvidersEnum, SessionInterface } from '@mymonorepo/shared/interfaces'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtTokenService } from 'libs/jwt-utils/src/lib/jwt-token.service'
import { User } from 'libs/user/src/lib/schemas/user-schema'
import { UnregisteredUserService } from 'libs/user/src/lib/services/unregistered.user.service'
import { UserSocialProviderService } from 'libs/user/src/lib/services/user-social-provider.service'
import { UserService } from 'libs/user/src/lib/services/user.service'
import { v4 as uuidv4 } from 'uuid'
import { RegisterSocialUserDto } from '../dtos/register-social-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtTokenService,
    private userService: UserService,
    private unRegisteredUserService: UnregisteredUserService,
    private userSocialProviderService: UserSocialProviderService
  ) {}

  handleSessionRequest(bearerToken): SessionInterface {
    const payload = this.jwtService.extractPayloadWithoutExpAndIat(bearerToken)
    return {
      user: payload.user,
    }
  }

  handleRefreshTokenRequest(bearerToken): JwtTokensInterface {
    this.jwtService.verify(bearerToken)
    const payload = this.jwtService.extractPayloadWithoutExpAndIat(bearerToken)
    return this.jwtService.createJwtToken(payload)
  }

  public async handleRegisteredUser(
    userFromDb: User,
    userFromProvider: any,
    provider: ProvidersEnum
  ): Promise<JwtTokensInterface | null> {
    const lastLoggedIn = new Date().toLocaleString()
    //update user
    this.userService.updateUser(userFromDb.id, {
      lastLoggedIn: lastLoggedIn,
    })

    // create the JWT token
    return this.jwtService.createJwtToken({
      user: {
        id: userFromDb.id,
        username: userFromDb.username,
        email: userFromDb.email,
        createdAt: userFromDb.createdAt,
        lastLoggedIn: lastLoggedIn,
        roles: userFromDb.roles,
        accessToken: provider === ProvidersEnum.GITHUB ? userFromProvider.accessTokenGithub : null,
        providerUsername: provider === ProvidersEnum.GITHUB ? userFromProvider.githubUsername : null,
        provider: provider,
        picture: userFromProvider.picture,
      },
    })
  }

  public async handleUnRegisteredUser(user: any, provider: ProvidersEnum) {
    // save or update unregistered user by email
    return this.unRegisteredUserService.updateUnregisteredUser({
      email: user.email,
      jwtJson: JSON.stringify(user),
      uuid: uuidv4(),
      provider: provider,
      createdAt: new Date().toLocaleString(),
      picture: user.picture,
    })
  }

  public async registerSocialUser(registerForm: RegisterSocialUserDto) {
    //check if user already exists
    const user = await this.userService.findUserByUsername(registerForm.username)
    if (user) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Username already exists', 'REGISTRATION_ERROR')
    }

    // get unregistered user by uuid
    const unregisteredUser = await this.unRegisteredUserService.getUnregisteredUserByUuid(registerForm.uuid)
    if (!unregisteredUser) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST)
    }

    //extract metadata from the jwt
    const unregisteredUserJWT = JSON.parse(unregisteredUser.jwtJson)
    const accessToken =
      unregisteredUser.provider === ProvidersEnum.GITHUB
        ? unregisteredUserJWT.accessTokenGithub
        : unregisteredUserJWT.accessToken
    const providerUsername =
      unregisteredUser.provider === ProvidersEnum.GITHUB
        ? unregisteredUserJWT.githubUsername
        : unregisteredUserJWT.username

    // create user
    const registeredUser = await this.userService.createUser({
      username: registerForm.username,
      email: unregisteredUser.email,
      roles: ['USER'],
      enabled: true,
      lastLoggedIn: new Date().toLocaleString(),
    })

    // create social user provider
    await this.userSocialProviderService.createUserSocialProvider({
      name: unregisteredUser.provider,
      providerUserId: unregisteredUserJWT.profileId,
      picture: unregisteredUserJWT.picture,
      user: registeredUser,
    })

    return { user: registeredUser, accessToken: accessToken, providerUsername: providerUsername }
  }

  public async createJwtTokenAfterRegister(userFromDb: User, accessToken: string, providerUsername: string) {
    //get provider from user id
    const providers = await this.userSocialProviderService.getUserSocialProviderByUserId(userFromDb.id)
    const provider = Array.isArray(providers) ? providers[0] : null

    //create tokens
    return this.jwtService.createJwtToken({
      user: {
        id: userFromDb.id,
        username: userFromDb.username,
        email: userFromDb.email,
        createdAt: userFromDb.createdAt,
        lastLoggedIn: userFromDb.lastLoggedIn,
        roles: userFromDb.roles,
        accessToken: accessToken,
        provider: provider?.name,
        picture: provider?.picture,
        providerUsername: providerUsername,
      },
    })
  }

  async handleSocialRedirect(req: any, res: any, provider: ProvidersEnum) {
    const userFromDb = await this.userService.getUserByEmail(req.user.email)

    // TODO handle user logging from 2 different providers
    if (userFromDb) {
      const tokens = await this.handleRegisteredUser(userFromDb, req.user, provider)
      res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true })
      res.cookie('accessToken', tokens.accessToken, { httpOnly: true })
    } else {
      const unRegisteredUser = await this.handleUnRegisteredUser(req.user, provider)
      const unregisteredUser = Buffer.from(
        JSON.stringify({
          email: unRegisteredUser.email,
          uuid: unRegisteredUser.uuid,
          provider: unRegisteredUser.provider,
          picture: unRegisteredUser.picture,
        })
      ).toString('base64')
      res.cookie('UNREGISTERED-USER', unregisteredUser)
    }
    res.redirect(req.session['redirect-after-login'] || `${process.env.UI_URL}`)
  }
}
