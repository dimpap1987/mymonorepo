import { AppValidator } from './app-validator.interface'

export class MinValidator implements AppValidator {
  private min: number

  constructor(min: number) {
    this.min = min
  }

  validate(input: any): boolean {
    return input.length > this.min
  }

  getErrorMessage(): string {
    return `must be more than ${this.min} letters`
  }
}
