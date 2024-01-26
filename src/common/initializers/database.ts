import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from '../../env/configs/database.config';
import { ConfigKey } from '../enums';

export function DatabaseModule(): DynamicModule {
  return SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      const dbConfig = config.get<ConfigType<typeof databaseConfig>>(
        ConfigKey.Database,
      );
      return {
        ...dbConfig,
        dialect: 'postgres',
        logging: false,
        synchronize: false,
        autoLoadModels: true,
        logQueryParameters: true,
      };
    },
  });
}
