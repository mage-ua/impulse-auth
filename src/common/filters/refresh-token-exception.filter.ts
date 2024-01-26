import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { IErrorResponse } from './interfaces';
import { Response } from 'express';
import { InvalidatedRefreshTokenError } from '../../iam/authentication/jwt-tokens-ids-storage.service';

@Catch(InvalidatedRefreshTokenError)
export class RefreshTokenExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidatedRefreshTokenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const customError: IErrorResponse = {
      path: request.url,
      statusCode: HttpStatus.UNAUTHORIZED,
      datetime: new Date(),
      details: exception.message,
    };

    return response.status(HttpStatus.UNAUTHORIZED).json(customError);
  }
}
