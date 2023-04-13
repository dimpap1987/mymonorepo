import { JwtUtilsModule } from '@mymonorepo/jwt-utils'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { RolesGuard } from './roles-guard'
import { AuthService } from './services/auth.service'
import { JwtAuthGuard } from './services/jwt-auth-guard'
import { FacebookStrategy } from './strategies/facebook-strategy'
import { GithubOauthStrategy } from './strategies/github-strategy'
import { GoogleStrategy } from './strategies/google-strategy'

@Module({
  imports: [JwtUtilsModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, FacebookStrategy, GithubOauthStrategy, JwtAuthGuard, RolesGuard],
  exports: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
