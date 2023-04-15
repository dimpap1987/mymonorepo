import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { UnRegisteredUserDto } from '../dto/unregistered-user.dto'
import { UnRegisteredUser, UnRegisteredUserDocument } from '../schemas/unregistered-users-schema'

@Injectable()
export class UnRegisteredUserRepository {
  constructor(
    @InjectModel(UnRegisteredUser.name) private UnRegisteredUserModel: Model<UnRegisteredUserDocument>
  ) {}

  async create(UnRegisteredUser: UnRegisteredUserDto): Promise<UnRegisteredUser> {
    const newUnRegisteredUser = new this.UnRegisteredUserModel(UnRegisteredUser)
    return newUnRegisteredUser.save()
  }

  async findOne(UnRegisteredUserFilterQuery: FilterQuery<UnRegisteredUser>): Promise<UnRegisteredUser> {
    return this.UnRegisteredUserModel.findOne(UnRegisteredUserFilterQuery)
  }

  async find(UnRegisteredUsersFilterQuery: FilterQuery<UnRegisteredUser>): Promise<UnRegisteredUser[]> {
    return this.UnRegisteredUserModel.find(UnRegisteredUsersFilterQuery)
  }

  async findOneAndUpdate(
    UnRegisteredUserFilterQuery: FilterQuery<UnRegisteredUser>,
    UnRegisteredUser: Partial<UnRegisteredUserDto>
  ): Promise<UnRegisteredUser> {
    return this.UnRegisteredUserModel.findOneAndUpdate(UnRegisteredUserFilterQuery, UnRegisteredUser, {
      new: true,
      upsert: true,
    })
  }
}
