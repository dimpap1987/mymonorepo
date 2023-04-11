import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github'

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL,
      scope: ['read:project', 'user:email', 'read:user'],
    })
  }

  async validate(accessToken: string, _refreshToken: string, profile: any, done: any) {
    //TODO maybe with should store the access token and refresh token in the db
    console.log(profile)

    const { username, profileUrl, photos, id } = profile
    done(null, {
      profileUrl: profileUrl,
      githubUsername: username,
      picture: photos[0].value,
      profileId: id,
      accessTokenGithub: accessToken,
    })
  }
}
