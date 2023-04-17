export function extractErrorMessage(error: any) {
  if (error?.createdBy === 'ApiExceptionFilter') {
    return error.message
  } else if (error?.createdBy === 'ValidationErrorFilter') {
    const objKey = Object.keys(error?.errors)[0]
    const errorMessage = error.errors[objKey]?.message
    return `${objKey} ${errorMessage}`
  }
  return 'Sorry, something went wrong.'
}
