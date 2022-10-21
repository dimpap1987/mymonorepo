import {Controller, Get, HttpException, HttpStatus, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return HttpStatus.OK;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    const loginUrl = AuthController.handleRedirectUrl(req.user?.jwt);
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
    const loginUrl = AuthController.handleRedirectUrl(req.user?.jwt);
    res.redirect(loginUrl);
  }

  private static handleRedirectUrl(jwt): string {
    if (jwt) {
      return `${process.env.LOGIN_URL}?token=${jwt}`
    }
    throw new HttpException({message: "Something went wrong"}, HttpStatus.BAD_REQUEST)
  }
}


