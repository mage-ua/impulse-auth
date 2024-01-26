import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../enums';

export function writeRestDocs(
  app: NestExpressApplication,
  config: ConfigService,
): void {
  if (config.get('nodeEnv') === Environment.Production) {
    return;
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Impulse Auth')
    .setDescription('Impulse Auth')
    .setVersion('1')
    .addTag('authentication')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('rest-api-docs', app, document);
}
