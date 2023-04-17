import { AlphanumericValidator } from './alphanumeric.validator'
import { AppValidator } from './app-validator.interface'
import { MaxValidator } from './max.validator'
import { MinValidator } from './min.validator'

export class UsernameValidator implements AppValidator {
  private functions: AppValidator[]
  private ERROR_MESSAGE: string

  constructor(functions?: AppValidator[]) {
    this.functions = functions
      ? [...functions]
      : [new AlphanumericValidator(), new MinValidator(4), new MaxValidator(16)]
  }
  getErrorMessage(): string {
    return this.ERROR_MESSAGE
  }

  validate(username: any): boolean {
    for (const func of this.functions) {
      if (!func.validate(username)) {
        this.ERROR_MESSAGE = func.getErrorMessage()
        return false
      }
    }
    return true
  }
}
