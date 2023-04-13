import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { UserDto } from './dto/user.dto'
import { User } from './schemas/user-schema'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ id })
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({})
  }

  async createUser(user: UserDto): Promise<User> {
    return this.userRepository.create({
      id: uuidv4(),
      username: user.username,
      email: user.email,
      emailVerified: false,
      enabled: true,
      createdAt: new Date().toLocaleString(),
    })
  }

  async updateUser(id: string, user: UserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate(
      { id },
      {
        ...user,
        updatedAt: new Date().toLocaleString(),
      }
    )
  }
}
