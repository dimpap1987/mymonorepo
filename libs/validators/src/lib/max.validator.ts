import { AppValidator } from './app-validator.interface'

export class MaxValidator implements AppValidator {
  private max: number

  constructor(max: number) {
    this.max = max
  }

  validate(input: any): boolean {
    return input.length < this.max
  }

  getErrorMessage(): string {
    return `must be less than ${this.max} letters`
  }
}
