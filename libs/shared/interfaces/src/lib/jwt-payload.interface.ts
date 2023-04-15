export interface JwtPayloadInterface {
  user: any
}
export interface JwtInterface {
  user: UserJwt
}

export interface UserJwt {
  id: string
  email: string
  username: string
  createdAt: string
  lastLoggedIn: string
  picture: string
  provider: string
  roles: string[]
  accessToken?: string
  providerUsername?: string
}
