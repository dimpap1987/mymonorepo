import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { UserDto } from '../dto/user.dto'
import { UserRepository } from '../repos/user.repository'
import { User } from '../schemas/user-schema'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ id })
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email })
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({})
  }

  async createUser(user: UserDto): Promise<User> {
    return this.userRepository.create({
      // id: uuidv4(),
      createdAt: new Date().toLocaleString(),
      ...user,
    })
  }

  async updateUser(id: string, user: UserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate(
      { id },
      {
        ...user,
      }
    )
  }
}
