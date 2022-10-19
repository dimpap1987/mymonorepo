import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from "../services/auth.service";

@Controller('google')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { /* TODO document why this async method 'googleAuth' is empty */ }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req)
  }
}


