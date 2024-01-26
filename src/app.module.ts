import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  DatabaseModule,
  RedisModule,
  ConfigModule,
} from './common/initializers';

import { IamModule } from './iam/iam.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middlewares';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    IamModule,
    UsersModule,
    RedisModule(),
    DatabaseModule(),
    ConfigModule(),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'health', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
