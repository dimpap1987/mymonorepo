import {Controller, Get, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../guards/jwt-auth-guard";
import {RolesEnum} from "@mymonorepo/shared/interfaces";
import {RolesGuard} from "../guards/roles-guard";
import {HasRoles} from "../guards/has-roles.decorator";

@Controller('users')
export class UserController {
  constructor() {
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
