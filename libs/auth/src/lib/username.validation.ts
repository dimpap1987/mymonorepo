import { UsernameValidator } from '@mymonorepo/validators'
import { Injectable } from '@nestjs/common'
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@Injectable()
@ValidatorConstraint({ name: 'username', async: false })
export class UsernameValidation implements ValidatorConstraintInterface {
  private readonly usernameValidator = new UsernameValidator()

  validate(value: any): boolean | Promise<boolean> {
    return this.usernameValidator.validate(value)
  }
  defaultMessage?(): string {
    return 'username ' + this.usernameValidator.getErrorMessage()
  }
}
