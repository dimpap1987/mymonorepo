import {Controller, Get, Headers, UseGuards} from "@nestjs/common";
import {User} from "../interfaces/user";
import {AuthService} from "../services/auth.service";
import {JwtAuthGuard} from "../guards/jwt-auth-guard";

@Controller('users')
export class UserController {
  constructor(private readonly authService: AuthService) {
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getUserMetadata(@Headers() headers: Record<string, string>): User {
    let bearerToken = headers['authorization'];
    bearerToken = bearerToken?.substring(7, bearerToken.length)
    return this.authService.verify(bearerToken);
  }
}
