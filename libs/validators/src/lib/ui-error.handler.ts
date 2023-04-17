export function extractErrorMessage(error: any) {
  if (error?.createdBy === 'ApiExceptionFilter') {
    return error.message
  } else if (error?.createdBy === 'ValidationErrorFilter') {
    const objKey = Object.keys(error?.message)[0]
    const errorMessage = error.message[objKey]?.message
    return `${objKey} ${errorMessage}`
  } else if (error?.createdBy === 'BadRequestExceptionFilter') {
    return error.message
  }
  return 'Sorry, something went wrong.'
}
