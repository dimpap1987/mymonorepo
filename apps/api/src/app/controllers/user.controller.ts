import {Controller, Get, Headers, HttpException, HttpStatus, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {User} from "../interfaces/user";
import {AuthService} from "../services/auth.service";

@Controller('users')
export class UserController {
  constructor(private readonly authService: AuthService) {
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getUserMetadata(@Headers() headers: Record<string, string>): User {
    try {
      let bearerToken = headers['authorization'];
      bearerToken = bearerToken.substring(7, bearerToken.length)
      return this.authService.decodeJwt(bearerToken);
    } catch (error) {
      console.warn(error)
      throw new HttpException('Invalid JWT', HttpStatus.BAD_REQUEST);
    }
  }
}
