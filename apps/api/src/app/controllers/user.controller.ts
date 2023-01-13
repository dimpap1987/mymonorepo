import {Controller, Get, Headers, UseGuards} from "@nestjs/common";
import {AuthService} from "../services/auth.service";
import {JwtAuthGuard} from "../guards/jwt-auth-guard";
import {RolesEnum, UserJwtInterface} from "@mymonorepo/shared/interfaces";
import {extractTokenFromHeaders} from "../utils/rest-utils";
import {RolesGuard} from "../guards/roles-guard";
import {HasRoles} from "../guards/has-roles.decorator";

@Controller('users')
export class UserController {
  constructor(private readonly authService: AuthService) {
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getUserMetadata(@Headers() headers: Record<string, string>): UserJwtInterface {
    const bearerToken = extractTokenFromHeaders(headers);
    const {email, firstName, lastName, picture, profileId, provider, roles} = this.authService.verify(bearerToken);
    return {
      email,
      firstName,
      lastName,
      picture,
      profileId,
      provider,
      roles
    }
  }

  @Get('secure')
  @HasRoles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  secure() {
    return {
      message: "testing"
    }
  }
}
