import { Controller, Get } from '@nestjs/common'
import { GithubService } from '../services/github.service'

@Controller('github')
export class RemoteRepoController {
  constructor(private githubService: GithubService) {}

  @Get('repo/list')
  getRepositories() {
    this.githubService.getRepositories()
  }
}
