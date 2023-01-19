import { ProvidersEnum, SessionInterface } from '@mymonorepo/shared/interfaces';
import {
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { AuthService } from '../services/auth.service';
import {
  extractRefreshTokenFromHeaders,
  extractTokenFromHeaders
} from '../utils/rest-utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return HttpStatus.OK;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const tokens = this.authService.handleLogin(req.user, ProvidersEnum.GOOGLE);
    const loginUrl = AuthController.handleRedirectUrl(tokens);
    res.redirect(loginUrl);
  }

  @Get('/facebook/login')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req, @Res() res) {
    const tokens = this.authService.handleLogin(req.user, ProvidersEnum.FACEBOOK);
    const loginUrl = AuthController.handleRedirectUrl(tokens);
    res.redirect(loginUrl);
  }

  @Get('/refresh-token')
  async refreshToken(@Headers() headers: Record<string, string>, @Res() res) {
    const bearerToken = extractRefreshTokenFromHeaders(headers);
    const tokens = this.authService.handleRefreshTokenRequest(bearerToken);
    res.send({ ...tokens });
  }

  @Get('session')
  @UseGuards(JwtAuthGuard)
  getUserMetadata(
    @Headers() headers: Record<string, string>
  ): SessionInterface {
    const bearerToken = extractTokenFromHeaders(headers);
    return this.authService.handleSessionRequest(bearerToken);
  }

  private static handleRedirectUrl(tokens): string {
    if (tokens) {
      return `${process.env.LOGIN_URL}?accessToken=${tokens?.accessToken}&refreshToken=${tokens.refreshToken}`;
    }
    throw new HttpException(
      { message: 'Something went wrong' },
      HttpStatus.BAD_REQUEST
    );
  }
}
