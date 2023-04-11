import { Injectable } from '@nestjs/common'
import { Octokit } from 'octokit'

@Injectable()
export class OctokitUtils {
  async getRepositoriesResponse(token: string, username: string): Promise<any> {
    const octokit = new Octokit({
      auth: token,
    })
    return octokit.request('GET /users/{username}/repos', {
      username: username,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  }

  async getUsersEmailsResponse(token: string): Promise<any> {
    const octokit = new Octokit({
      auth: token,
    })
    return octokit.request('GET /user/public_emails', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  }
}
