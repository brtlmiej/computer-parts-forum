import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '../users/enum/user-status.enum';

@Injectable()
export class AuthService {
  constructor(protected readonly usersRepository: UsersRepository) {}

  async validateUser(email: string, plainPassword: string) {
    const user = await this.usersRepository.findOne({ email: email });
    if (user && await bcrypt.compare(plainPassword, user.password) && user.status == UserStatus.active) {
      const { password , ...result} = user;
      return result;
    }
    return null;
  }
}
