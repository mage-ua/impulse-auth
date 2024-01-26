import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../../common/enums';

export default registerAs(ConfigKey.Database, () => ({
  uri: process.env.POSTGRES_URI,
}));
