import { GithubUserInterface, GoogleUserInterface, UserInterface } from './user.interface'

export interface JwtPayloadInterface {
  user: UserInterface | GithubUserInterface | GoogleUserInterface
}
