import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheckDto } from './common/dto';
import { AuthType } from './common/enums';
import { Auth } from './common/decorators';

@Auth(AuthType.None)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  checkHealth(): HealthCheckDto {
    return this.appService.checkHealth();
  }
}
