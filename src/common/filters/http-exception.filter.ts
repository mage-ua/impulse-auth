import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IErrorResponse } from './interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const customError: IErrorResponse = {
      path: request.url,
      statusCode: status,
      datetime: new Date(),
      message: exception.message,
    };

    if (exception instanceof BadRequestException) {
      const responsePayload = exception.getResponse();

      if (typeof responsePayload === 'object' && 'message' in responsePayload) {
        customError.details = (responsePayload as any).message;
      }
    }

    response.status(status).json(customError);
  }
}
