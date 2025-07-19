import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GoogleOAuthProfile, LoginForm } from './auth.interface';
import { UserService } from '../user/user.service';
import { User, UserFormData } from '../user/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  //   Private Variables and Methods

  private isLoginWithEmail(identifier: string): boolean {
    return /\S+@\S+\.\S+/.test(identifier);
  }

  private async createUserViaGoogle(googleCredentials: GoogleOAuthProfile) {
    const data: UserFormData = {
      email: googleCredentials.email,
      name: googleCredentials.name,
      roles: ['user'],
      confirmPassword: '',
      password: '',
      username: null,
    };

    await this.userService.createNewUser(data);
  }

  //   Public Methods
  async loginUser(formData: LoginForm) {
    const { identifier, password } = formData;
    const isLoginWithEmail = this.isLoginWithEmail(identifier);
    let user: User;

    if (isLoginWithEmail) {
      user = await this.userService.getUserByEmail(identifier)
    } else {
      user = await this.userService.getUserByUsername(identifier);
    }

    if (!user) throw new NotFoundException('User tidak ditemukan');

    const isCompared = await bcrypt.compare(password, user.hashedPassword);
    if (!isCompared) throw new UnauthorizedException('Password salah');

    return { message: `Login Berhasil! Selamat Datang ${user.username}`, user };
  }

  async loginUserWithGoogle(raw: GoogleOAuthProfile) {
    const { email } = raw;
    let user: User;
    user = await this.userService.getUserByEmail(email);

    if (!user) {
      await this.createUserViaGoogle(raw);
      user = await this.userService.getUserByEmail(email);
    }

    return user;
  }
}
