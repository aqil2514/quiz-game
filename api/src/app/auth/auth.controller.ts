import { Body, Controller, Post, Req, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { LoginFormDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { LoginForm } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ZodValidationPipe)
  @Post('/login')
  async loginUser(@Body() formData: LoginFormDTO) {
    return await this.authService.loginUser(formData as LoginForm);
  }

  @Post('/google-login')
  async loginUserWithGoogle(@Body() raw: any) {
    return await this.authService.loginUserWithGoogle(raw);
  }
}
