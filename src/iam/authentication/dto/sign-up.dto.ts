import { IsEmail, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @Matches(/^(?=.{8,32}$)(?=.*?[a-zа-я])(?=.*?[A-ZА-Я])(?=.*?[0-9]).*$/, {
    message:
      'Invalid password. Should be 6 to 32 chars length, contain at least one uppercase letter, lowercase letter and number',
  })
  @ApiProperty()
  password: string;
}
