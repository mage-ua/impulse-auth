import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../database/entities';
import { Auth, Roles } from '../common/decorators';
import { AuthType, Role } from '../common/enums';
import { TransformInterceptor } from '../common/interceptors';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Auth(AuthType.Bearer)
@Roles(Role.Admin, Role.Regular)
@UseInterceptors(TransformInterceptor)
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.Admin)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
}
