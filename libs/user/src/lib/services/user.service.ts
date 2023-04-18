import { Injectable } from '@nestjs/common'
import { UserDto } from '../dto/user.dto'
import { UserRepository } from '../repos/user.repository'
import { User } from '../schemas/user-schema'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserByUsername(username: string) {
    return this.userRepository.findOne({ username })
  }

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
      createdAt: new Date().toLocaleString(),
      ...user,
    })
  }

  async updateUser(id: string, user: UserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate(
      { _id: id },
      {
        ...user,
      }
    )
  }
}
