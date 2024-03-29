import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { UserDto } from '../dto/user.dto'
import { User, UserDocument } from '../schemas/user-schema'

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery)
  }

  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(usersFilterQuery)
  }

  async create(user: UserDto): Promise<User> {
    const newUser = new this.userModel(user)
    return newUser.save()
  }

  async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<UserDto>): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user, { new: true })
  }
}
