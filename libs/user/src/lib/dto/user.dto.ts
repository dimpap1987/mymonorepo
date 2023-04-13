export class UserDto {
  id?: string
  username?: string
  email?: string
  emailVerified?: boolean
  enabled?: boolean
  createdAt?: string
  updatedAt?: string
  lastLoggedIn?: string
  roles?: string[]
}
