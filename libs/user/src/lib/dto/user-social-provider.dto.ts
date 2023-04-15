import { UserDto } from './user.dto'

export class UserSocialProviderDto {
  name: string
  providerUserId: string
  picture?: string
  user?: UserDto
}
