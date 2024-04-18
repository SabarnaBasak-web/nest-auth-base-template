import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() createUser: CreateUserDto) {
    return this.authService.signUpUser(createUser);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginInDto: LoginDto) {
    console.log('@@ login controller');
    return this.authService.loginUser(loginInDto);
  }
}
