import { Injectable } from '@nestjs/common'
import { UnRegisteredUserDto } from '../dto/unregistered-user.dto'
import { UnRegisteredUserRepository } from '../repos/unregistered-user.repository'
import { UnRegisteredUser } from '../schemas/unregistered-users-schema'

@Injectable()
export class UnregisteredUserService {
  constructor(private readonly unregisteredUserRepository: UnRegisteredUserRepository) {}

  async getUnregisteredUserByUuid(uuid: string): Promise<UnRegisteredUser> {
    return this.unregisteredUserRepository.findOne({ uuid })
  }

  async getUnregisteredUsers(): Promise<UnRegisteredUser[]> {
    return this.unregisteredUserRepository.find({})
  }

  async createUnregisteredUser(unregisteredUser: UnRegisteredUserDto): Promise<UnRegisteredUser> {
    return this.unregisteredUserRepository.create({
      ...unregisteredUser,
    })
  }

  async updateUnregisteredUser(unregisteredUser: UnRegisteredUserDto): Promise<UnRegisteredUser> {
    return this.unregisteredUserRepository.findOneAndUpdate(
      { email: unregisteredUser.email },
      {
        ...unregisteredUser,
      }
    )
  }
}
