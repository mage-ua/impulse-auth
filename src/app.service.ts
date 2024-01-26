import { Injectable } from '@nestjs/common';
import { HealthCheckDto } from './common/dto';

@Injectable()
export class AppService {
  checkHealth(): HealthCheckDto {
    return {
      message: 'ok',
      statusCode: 200,
      datetime: new Date(),
    };
  }
}
