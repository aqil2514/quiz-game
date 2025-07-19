import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { RegisterFormDTO } from './user.dto';
import { UserFormData } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser() {
    return await this.userService.getAllUsers();
  }

  @UsePipes(ZodValidationPipe)
  @Post()
  async createNewUser(@Body() formData: RegisterFormDTO) {
    return await this.userService.createNewUSer(formData as UserFormData) ;
  }
}
