import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UnRegisteredUserRepository } from './repos/unregistered-user.repository'
import { UserSocialProviderRepository } from './repos/user-social-provider.repository'
import { UserRepository } from './repos/user.repository'
import { UnRegisteredUser, UnRegisteredUserSchema } from './schemas/unregistered-users-schema'
import { User, UserSchema } from './schemas/user-schema'
import { UserSocialProvider, UserSocialProviderSchema } from './schemas/user-social-provider-schema'
import { UnregisteredUserService } from './services/unregistered.user.service'
import { UserSocialProviderService } from './services/user-social-provider.service'
import { UserService } from './services/user.service'
import { UserController } from './user.controller'

const serviceAndRepositories = [
  UserService,
  UnregisteredUserService,
  UserSocialProviderService,
  UserRepository,
  UnRegisteredUserRepository,
  UserSocialProviderRepository,
]
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UnRegisteredUser.name, schema: UnRegisteredUserSchema },
      { name: UserSocialProvider.name, schema: UserSocialProviderSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [...serviceAndRepositories],
  exports: [...serviceAndRepositories],
})
export class UserModule {}
