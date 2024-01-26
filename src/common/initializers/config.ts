import { DynamicModule } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';
import { validationSchema } from '../../env/validation.schema';
import baseConfig from '../../env/configs/base.config';
import databaseConfig from '../../env/configs/database.config';
import redisConfig from '../../env/configs/redis.config';

export function ConfigModule(): DynamicModule {
  return NestConfig.forRoot({
    envFilePath: '.env',
    validationSchema,
    load: [baseConfig, databaseConfig, redisConfig],
    validationOptions: {
      allowUnknown: false,
      abortEarly: true,
      stripUnknown: true,
    },
  });
}
