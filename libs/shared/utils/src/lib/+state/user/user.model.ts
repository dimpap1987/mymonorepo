import { RolesEnum } from '@mymonorepo/shared/interfaces'

export interface User {
  email?: string
  username?: string
  firstName?: string
  githubUsername?: string
  lastName?: string
  picture?: string
  profileId?: string
  roles?: RolesEnum[]
  loggedIn?: boolean
  lastConnectedTime?: string
  provider?: string
}
