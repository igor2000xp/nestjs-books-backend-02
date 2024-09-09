import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('registration')
  async registerUser(@Body() dto: RegisterUserDto) {
    console.log('user.controller', dto);
    return await this.userService.registerUser(dto);
  }

  @Get()
  async getAlUsers() {
    return await this.userService.getAllUsers();
  }
}
