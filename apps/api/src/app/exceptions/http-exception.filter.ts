import { ApiException } from '@mymonorepo/back-end-utils'
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'
import { Response } from 'express'

@Catch(ApiException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost) {
    Logger.error(
      `Exception of type: '${exception.name}' - message: '${
        exception.message
      }' - statusCode: '${exception.getStatus()}' - errorCode: '${exception.errorCode}'`
    )
    host.switchToHttp().getResponse<Response>().status(exception.getStatus()).json({
      errorCode: exception.errorCode,
      message: exception.message,
    })
  }
}

// Generic error handler - if the exception is type of ApiException it will be handled from the above handler because in the app module it has been defined later
@Catch()
export class GenericExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    Logger.error(`Generic Exception of type: '${exception.name}' - message: '${exception.message}'`)
    host.switchToHttp().getResponse<Response>().status(500).json({
      errorCode: 0,
      message: 'Something went wrong',
    })
  }
}
