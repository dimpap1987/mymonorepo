import {Controller, Get, Headers, UseGuards} from "@nestjs/common";
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
    let bearerToken = headers['authorization'];
    bearerToken = bearerToken.substring(7, bearerToken.length)
    return this.authService.verify(bearerToken);
  }
}
