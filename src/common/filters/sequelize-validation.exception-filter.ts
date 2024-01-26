import { ValidationError } from 'sequelize';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { IErrorResponse } from './interfaces';
import { Response } from 'express';

@Catch(ValidationError)
export class SequelizeValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const customError: IErrorResponse = {
      path: request.url,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      datetime: new Date(),
      details: exception.errors[0].message,
    };

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(customError);
  }
}
