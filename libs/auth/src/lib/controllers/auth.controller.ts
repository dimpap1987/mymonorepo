import { ProvidersEnum, SessionInterface } from '@mymonorepo/shared/interfaces'
import { Controller, Get, HttpCode, HttpStatus, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../services/auth.service'
import { JwtAuthGuard } from '../services/jwt-auth-guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return HttpStatus.OK
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const tokens = this.authService.handleLogin(req.user, ProvidersEnum.GOOGLE)
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true })
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true })
    res.redirect(AuthController.handleRedirectUrl(req))
  }

  @Get('/facebook/login')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    return HttpStatus.OK
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req, @Res() res) {
    const tokens = this.authService.handleLogin(req.user, ProvidersEnum.FACEBOOK)
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true })
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true })
    res.redirect(AuthController.handleRedirectUrl(req))
  }

  @Get('github/login')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    return HttpStatus.OK
  }

  @Get('/github/redirect')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req, @Res() res) {
    const tokens = this.authService.handleLogin(req.user, ProvidersEnum.GITHUB)
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true })
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true })
    res.redirect(AuthController.handleRedirectUrl(req))
  }

  @Get('/refresh-token')
  @HttpCode(200)
  async refreshToken(@Req() req, @Res() res) {
    const tokens = this.authService.handleRefreshTokenRequest(req.cookies?.refreshToken)
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true })
    // check in order to refresh refresh token
    res.send({})
  }

  @Get('session')
  @UseGuards(JwtAuthGuard)
  getUserMetadata(@Req() req): SessionInterface {
    const accessToken = req.cookies['accessToken']
    return this.authService.handleSessionRequest(accessToken)
  }

  @Get('/log-out')
  @HttpCode(200)
  async logOut(@Res() res) {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.clearCookie('_csrf')
    res.clearCookie('XSRF-TOKEN')
    res.send({})
  }

  private static handleRedirectUrl(req: any): string {
    return req.session['redirect-after-login'] || `${process.env.UI_URL}`
  }
}
