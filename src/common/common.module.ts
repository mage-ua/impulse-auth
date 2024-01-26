import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import {
  SequelizeValidationExceptionFilter,
  HttpExceptionFilter,
  RefreshTokenExceptionFilter,
} from './filters';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: RefreshTokenExceptionFilter,
    },
    {
      provide: APP_FILTER,
      // "SequelizeValidationExceptionFilter" must be ABOVE
      // "UniqueConstraintExceptionFilter" because "UniqueConstraintError"
      // is child Class from "ValidationError"
      useClass: SequelizeValidationExceptionFilter,
    },
  ],
})
export class CommonModule {}
