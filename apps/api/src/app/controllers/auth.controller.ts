import {Controller, Get, HttpException, HttpStatus, Query, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from "../services/auth.service";
import {ProvidersEnum} from "@mymonorepo/shared/interfaces";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return HttpStatus.OK;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const tokens = this.authService.createJwtToken(req.user, ProvidersEnum.GOOGLE);
    const loginUrl = AuthController.handleRedirectUrl(tokens);
    res.redirect(loginUrl);
  }

  @Get("/facebook/login")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin() {
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req, @Res() res) {
    const tokens = this.authService.createJwtToken(req.user, ProvidersEnum.FACEBOOK);
    const loginUrl = AuthController.handleRedirectUrl(tokens);
    res.redirect(loginUrl);
  }

  @Get("/refresh-token")
  async refreshToken(@Query() query: { refreshToken: string }, @Res() res) {
    const user = this.authService.verify(query.refreshToken)
    const tokens = this.authService.createJwtToken(user, ProvidersEnum[user?.provider]);
    res.send({...tokens})
  }

  private static handleRedirectUrl(tokens): string {
    if (tokens) {
      return `${process.env.LOGIN_URL}?accessToken=${tokens?.accessToken}&refreshToken=${tokens.refreshToken}`
    }
    throw new HttpException({message: "Something went wrong"}, HttpStatus.BAD_REQUEST)
  }
}


