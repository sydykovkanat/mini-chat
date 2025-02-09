import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(new ValidationPipe({ transform: true })) dto: UserDto) {
    return this.usersService.register(dto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(new ValidationPipe({ transform: true })) dto: LoginDto) {
    return this.usersService.login(dto);
  }
}
