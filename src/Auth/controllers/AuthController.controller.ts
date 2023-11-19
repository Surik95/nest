import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { SignUpUserDto } from '../interface/dto/signUp-userService';
import { SignInUserDto } from '../interface/dto/signIn-userService';
import { AuthService } from '../service/AuthService.service';
import { UserDocument } from '../schemas/user.schema';
import { JwtAuthGuard } from '../jwt.auth.guard';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/signup')
  public signUp(@Body() body: SignUpUserDto): Promise<UserDocument> {
    return this.authService.signUp(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/qwerty')
  public sign(): number {
    console.log('JwtAuthGuard пройден - можно получать все объекты дальше');
    return 1;
  }

  @Post('users/signin')
  public signIn(@Body() body: SignInUserDto): Promise<string> {
    return this.authService.signIn(body);
  }
}
