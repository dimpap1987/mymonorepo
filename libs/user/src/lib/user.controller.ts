import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { User } from './schemas/user-schema'
import { UserService } from './services/user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  //   @HasRoles(RolesEnum.USER)
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUserById(userId)
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers()
  }

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.createUser(userDto)
  }

  @Patch(':userId')
  async updateUser(@Param('userId') userId: string, @Body() userDto: UserDto): Promise<User> {
    return this.userService.updateUser(userId, userDto)
  }
}
