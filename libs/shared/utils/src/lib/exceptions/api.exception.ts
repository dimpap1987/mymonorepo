import { HttpException, HttpStatus } from '@nestjs/common'

export class ApiException extends HttpException {
  private static readonly defaultMessage = 'Something went wrong.'
  errorCode: number | undefined

  constructor(
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    message: string = ApiException.defaultMessage,
    errorCode: number
  ) {
    super(message, status)
    this.errorCode = errorCode
  }
}
