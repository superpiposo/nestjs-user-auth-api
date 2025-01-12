import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/is_public.decorator';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Post('/signin')
  async signin(@Body() data: SigninDto) {
    return this.authService.signin(data);
  }

  @Post('/verify')
  async verifyToken(@Body() data: { access_token: string }) {
    return this.authService.verifyToken(data.access_token);
  }
}
