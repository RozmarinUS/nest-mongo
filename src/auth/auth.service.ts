import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(login: string, password: string) {
    const user = await this.usersService.findOne({ login });
    if (user && user.password === password) {
      await this.usersService.loginUser(user._id, {
        loggedAt: new Date(),
      });
      return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.login, _id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
