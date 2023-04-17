import { ApiException } from '@mymonorepo/back-end-utils'
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common'
import { Response } from 'express'
import { Error } from 'mongoose'
import ValidationError = Error.ValidationError

@Catch(ApiException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost) {
    Logger.error(
      `Exception of type: '${exception.name}' - message: '${
        exception.message
      }' - statusCode: '${exception.getStatus()}' - errorCode: '${exception.errorCode}'`
    )
    host.switchToHttp().getResponse<Response>().status(exception.getStatus()).json({
      createdBy: 'ApiExceptionFilter',
      errorCode: exception.errorCode,
      message: exception.message,
    })
  }
}

@Catch(ValidationError)
export class ValidationErrorFilter implements RpcExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost): any {
    Logger.error(`Validation Exception of type: '${exception.name}' - message: '${exception.message}'`)
    return host.switchToHttp().getResponse().status(400).json({
      createdBy: 'ValidationErrorFilter',
      message: exception.errors,
    })
  }
}

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const errorMessage = exception.response?.message?.join(`, `)
    Logger.error(
      `BadRequest Exception of type: '${exception.name}' - message: '${
        errorMessage ? errorMessage : exception.message
      }'`
    )
    host
      .switchToHttp()
      .getResponse<Response>()
      .status(400)
      .json({
        createdBy: 'BadRequestExceptionFilter',
        message: errorMessage ? errorMessage : 'Something went wrong',
      })
  }
}

// Generic error handler - if the exception is type of ApiException it will be handled from the above handler because in the app module it has been defined later
@Catch()
export class GenericExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    Logger.error(`Generic Exception of type: '${exception.name}' - message: '${exception.message}'`)
    host.switchToHttp().getResponse<Response>().status(500).json({
      createdBy: 'GenericExceptionFilter',
      message: 'Something went wrong',
    })
  }
}
