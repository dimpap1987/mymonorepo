import { GithubUserInterface, JwtPayloadInterface } from '@mymonorepo/shared/interfaces'
import { Inject, Injectable } from '@nestjs/common'
import { Octokit } from 'octokit'

@Injectable()
export class GithubService {
  constructor(@Inject('jwt') private readonly jwt: JwtPayloadInterface) {}

  async getRepositories() {
    const githubUser = this.jwt.user as GithubUserInterface
    const octokit = new Octokit({
      auth: githubUser.accessTokenGithub,
    })
    const response = await octokit.request('GET /users/{username}/repos', {
      username: githubUser.githubUsername,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
    return response.data.map(d => {
      return {
        id: d.id,
        name: d.name,
        owner: d.owner,
        contents_url: d.contents_url,
        branches_url: d.branches_url,
        commits_url: d.commits_url,
      }
    })
  }
}
