import { Validate } from 'class-validator'
import { UsernameValidation } from '../username.validation'

export class RegisterSocialUserDto {
  uuid: string
  @Validate(UsernameValidation)
  username: string
}
