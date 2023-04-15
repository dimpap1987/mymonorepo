import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { UserSocialProviderDto } from '../dto/user-social-provider.dto'
import { UserSocialProvider, UserSocialProviderDocument } from '../schemas/user-social-provider-schema'

@Injectable()
export class UserSocialProviderRepository {
  constructor(
    @InjectModel(UserSocialProvider.name) private UserSocialProviderModel: Model<UserSocialProviderDocument>
  ) {}

  async findOne(UserSocialProviderFilterQuery: FilterQuery<UserSocialProvider>): Promise<UserSocialProvider> {
    return this.UserSocialProviderModel.findOne(UserSocialProviderFilterQuery)
  }
  async create(UserSocialProvider: UserSocialProviderDto): Promise<UserSocialProvider> {
    const newUserSocialProvider = new this.UserSocialProviderModel(UserSocialProvider)
    return newUserSocialProvider.save()
  }

  async find(UserSocialProvidersFilterQuery: FilterQuery<UserSocialProvider>): Promise<UserSocialProvider[]> {
    return this.UserSocialProviderModel.find(UserSocialProvidersFilterQuery)
  }

  async findOneAndUpdate(
    UserSocialProviderFilterQuery: FilterQuery<UserSocialProvider>,
    UserSocialProvider: Partial<UserSocialProviderDto>
  ): Promise<UserSocialProvider> {
    return this.UserSocialProviderModel.findOneAndUpdate(UserSocialProviderFilterQuery, UserSocialProvider, {
      new: true,
    })
  }
}
