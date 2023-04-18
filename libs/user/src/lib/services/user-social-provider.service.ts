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

  async createUserSocialProvider(userSocialProvider: UserSocialProviderDto): Promise<UserSocialProvider> {
    return this.userSocialProviderRepository.create({
      ...userSocialProvider,
    })
  }

  async updateUserSocialProvider(
    id: string,
    userSocialProvider: UserSocialProviderDto
  ): Promise<UserSocialProvider> {
    return this.userSocialProviderRepository.findOneAndUpdate(
      { _id: id },
      {
        ...userSocialProvider,
      }
    )
  }

  async getUserSocialProviderByUserId(userId: string): Promise<UserSocialProvider[]> {
    return this.userSocialProviderRepository.find({
      user: userId,
    })
  }
}
