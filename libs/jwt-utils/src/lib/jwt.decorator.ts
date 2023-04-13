import { JwtPayloadInterface } from '@mymonorepo/shared/interfaces'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { decode } from 'jsonwebtoken'

export const Jwt = createParamDecorator((data: any, ctx: ExecutionContext): JwtPayloadInterface => {
  const jwt = ctx.switchToHttp().getRequest()?.cookies?.accessToken
  try {
    return decode(jwt, { complete: true })?.payload as JwtPayloadInterface
  } catch (err) {
    console.error(err)
    return null
  }
})
