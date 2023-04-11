import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github'
import { OctokitUtils } from '../utils/octokit-utils'

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly octokitUtils: OctokitUtils) {
    super({
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL,
      scope: ['read:project', 'user:email', 'read:user'],
    })
  }

  async validate(accessToken: string, _refreshToken: string, profile: any, done: any) {
    const userEmails = await this.octokitUtils.getUsersEmailsResponse(accessToken)
    const emailObj = userEmails?.data?.find(d => d.primary && d.verified)

    const { username, profileUrl, photos, id } = profile
    done(null, {
      profileUrl: profileUrl,
      githubUsername: username,
      picture: photos[0].value,
      profileId: id,
      accessTokenGithub: accessToken,
      email: emailObj?.email,
    })
  }
}
