import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../database/entities';
import { ErrorCode } from '../common/errors';

@Injectable()
export class UsersService {
  async findOne(id: number): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new BadRequestException(ErrorCode.USER.NOT_EXISTS);
    }
    return user;
  }

  findAll(): Promise<User[]> {
    return User.findAll();
  }
}
