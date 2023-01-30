import { RolesEnum } from "@mymonorepo/shared/interfaces";
import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { get } from "http";
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
      message: "Successfully Updated"
    }
  }

  @Get('')
  getUsers() {
    return [
      {
        username:"user1",
      },
      {
        username:"user2",
      },
      {
        username:"user3",
      },
    ]
  }
}
