import { RolesEnum } from "@mymonorepo/shared/interfaces";
import { Controller, Post, UseGuards } from "@nestjs/common";
import { HasRoles } from "../guards/has-roles.decorator";
import { JwtAuthGuard } from "../guards/jwt-auth-guard";
import { RolesGuard } from "../guards/roles-guard";

@Controller('users')
export class UserController {
  constructor() {
  }

  @Post('secure')
  @HasRoles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  secure() {
    return {
      message: "testing"
    }
  }
}
