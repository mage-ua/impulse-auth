import { HttpStatus } from '@nestjs/common';

export interface IErrorResponse {
  details?: any;
  message?: string;
  datetime: Date;
  path: string;
  statusCode: HttpStatus;
  error?: string;
}
