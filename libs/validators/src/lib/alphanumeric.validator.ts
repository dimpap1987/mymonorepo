import { AppValidator } from './app-validator.interface'

export class AlphanumericValidator implements AppValidator {
  validate(input: any): boolean {
    return /^[a-zA-Z0-9]+$/.test(input)
  }
  getErrorMessage(): string {
    return 'must contain only alphanumeric characters'
  }
}
