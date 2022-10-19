import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { /* TODO document why this async method 'googleAuth' is empty */
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    const jwt = req.user?.jwt;
    let loginUrl = process.env.LOGIN_URL;
    if (jwt) loginUrl = `${loginUrl}?token=${jwt}`;
    res.redirect(loginUrl);
  }
}


