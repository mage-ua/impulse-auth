import Joi from 'joi';
import { Environment } from '../common/enums';

export const validationSchema = Joi.object({
  PORT: Joi.number()
    .required()
    .error(() => 'The app must specify what port to run on, but it is not'),
  NODE_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .required(),

  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
  JWT_REFRESH_TOKEN_TTL: Joi.number().required(),

  POSTGRES_URI: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
});
