import { JwtUtilsModule } from '@mymonorepo/jwt-utils'
import { UserModule } from '@mymonorepo/user'
import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller'
import { RolesGuard } from './guards/roles-guard'
import { AuthService } from './services/auth.service'
import { JwtAuthGuard } from './services/jwt-auth-guard'
import { FacebookStrategy } from './strategies/facebook-strategy'
import { GithubOauthStrategy } from './strategies/github-strategy'
import { GoogleStrategy } from './strategies/google-strategy'
import { UsernameValidation } from './username.validation'

@Module({
  imports: [JwtUtilsModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    FacebookStrategy,
    GithubOauthStrategy,
    JwtAuthGuard,
    RolesGuard,
    UsernameValidation,
  ],
  exports: [AuthService, JwtAuthGuard, RolesGuard, UsernameValidation],
})
export class AuthModule {}
