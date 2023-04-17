export interface AppValidator {
  validate(input: any): boolean
  getErrorMessage(): string
}
