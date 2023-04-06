import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-github'

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL,
      scope: ['public_profile', 'read:project'],
    })
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    console.log(accessToken)

    const { username, profileUrl, photos, id } = profile
    return {
      profileUrl: profileUrl,
      firstName: username,
      picture: photos[0].value,
      profileId: id,
    }
  }
}
