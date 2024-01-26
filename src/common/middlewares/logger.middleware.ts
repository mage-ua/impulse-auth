import { Request, Response, NextFunction } from 'express';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { excludeProps } from '../utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly sensitiveFields = ['password'];

  private readonly logger = new Logger('Express');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, body } = request;

    const payload = JSON.stringify(excludeProps(body, this.sensitiveFields));
    this.logger.log(`[${method}] [${originalUrl}] Payload: ${payload}`);

    next();
  }
}
