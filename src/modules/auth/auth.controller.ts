import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LogoutMessage } from './dto/message-logout.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
  ) {}

  // @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'To login you need the pass and email' })
  @ApiResponse({
    status: 201,
    type: LogoutMessage,
    description: 'Everything is OK',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiUnauthorizedResponse({ description: 'Login or password incorrect' })
  @ApiForbiddenResponse({ description: 'User blocked' })
  // @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req: { user: string }, @Body() userDto: LoginUserDto) {
    return {
      accessToken: this.jwt.sign({ userId: req.user, user: userDto.email }),
    };
  }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
