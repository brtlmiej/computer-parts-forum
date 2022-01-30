import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '../users/enum/user-status.enum';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    protected readonly usersRepository: UsersRepository,
    protected readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, plainPassword: string) {
    const user = await this.usersRepository.findOne({ email: email });
    if (user && await bcrypt.compare(plainPassword, user.password) && user.status == UserStatus.active) {
      const { password , ...result} = user;
      return result;
    }
    return null;
  }

  async loginJwt(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    let user = await this.usersRepository.findOne({ email: email });
    if (user) {
      throw new BadRequestException();
    }
    user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.status = 1;
    user.password = bcrypt.hashSync(password, 12);
    return await this.usersRepository.save(user);
  }
}
