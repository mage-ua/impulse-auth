import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../../common/enums';

export default registerAs(ConfigKey.Redis, () => ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
}));
