import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import redisConfig from '../../env/configs/redis.config';
import { RedisModule as RootRedisModule } from '@nestjs-modules/ioredis';
import { ConfigKey } from '../enums';

export function RedisModule(): DynamicModule {
  return RootRedisModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      const rdsConfig = config.get<ConfigType<typeof redisConfig>>(
        ConfigKey.Redis,
      );
      return {
        type: 'single',
        options: {
          ...rdsConfig,
        },
      };
    },
  });
}
