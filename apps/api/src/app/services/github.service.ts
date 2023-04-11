import { GithubUserInterface, JwtPayloadInterface } from '@mymonorepo/shared/interfaces'
import { Inject, Injectable } from '@nestjs/common'
import { OctokitUtils } from '../utils/octokit-utils'

@Injectable()
export class GithubService {
  constructor(
    @Inject('jwt') private readonly jwt: JwtPayloadInterface,
    private readonly octokitUtils: OctokitUtils
  ) {}

  async getRepositories() {
    const githubUser = this.jwt?.user as GithubUserInterface
    const response = await this.octokitUtils.getRepositoriesResponse(
      githubUser.accessTokenGithub,
      githubUser.githubUsername
    )
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
