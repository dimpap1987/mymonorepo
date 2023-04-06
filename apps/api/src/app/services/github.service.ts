import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GithubService {
  constructor(@Inject('jwt') private readonly jwt: any) {}

  getRepositories() {
    console.log('getRepositories')
    console.log(this.jwt)
  }
}
