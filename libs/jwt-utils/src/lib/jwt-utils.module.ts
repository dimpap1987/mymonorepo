import { Module } from '@nestjs/common'
import { JwtTokenService } from './jwt-token.service'

@Module({
  controllers: [],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtUtilsModule {}
