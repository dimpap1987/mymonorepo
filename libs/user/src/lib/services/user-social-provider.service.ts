import { Injectable } from '@nestjs/common'
import { UserSocialProviderDto } from '../dto/user-social-provider.dto'
import { UserSocialProviderRepository } from '../repos/user-social-provider.repository'
import { UserSocialProvider } from '../schemas/user-social-provider-schema'

@Injectable()
export class UserSocialProviderService {
  constructor(private readonly userSocialProviderRepository: UserSocialProviderRepository) {}

  async getUserSocialProviderById(id: string): Promise<UserSocialProvider> {
    return this.userSocialProviderRepository.findOne({ id })
  }

  async getUserSocialProviders(): Promise<UserSocialProvider[]> {
    return this.userSocialProviderRepository.find({})
  }

  async createUserSocialProvider(UserSocialProvider: UserSocialProviderDto): Promise<UserSocialProvider> {
    return this.userSocialProviderRepository.create({
      ...UserSocialProvider,
    })
  }

  async updateUserSocialProvider(
    id: string,
    UserSocialProvider: UserSocialProviderDto
  ): Promise<UserSocialProvider> {
    return this.userSocialProviderRepository.findOneAndUpdate(
      { id },
      {
        ...UserSocialProvider,
      }
    )
  }

  async getUserSocialProviderByUserId(userId: string): Promise<UserSocialProvider[]> {
    return this.userSocialProviderRepository.find({
      user: userId,
    })
  }
}
