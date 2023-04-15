import { RolesEnum } from './roles.enum'

export interface UserInterface {
  picture?: string
  profileId?: string
  provider?: string
  roles?: RolesEnum[]
  lastConnectedTime?: string
}

export interface GoogleUserInterface extends UserInterface {
  firstName?: string
  lastName?: string
  email: string
}

export interface FacebookInterface extends UserInterface {
  firstName?: string
  lastName?: string
  email: string
}
export interface GithubUserInterface extends UserInterface {
  providerUsername: string
  accessToken?: string
}
