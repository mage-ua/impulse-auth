import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { writeRestDocs } from './common/utils';

async function bootstrap() {
  const logger = new Logger();

  process.on('unhandledRejection', (error: Error) => {
    logger.error('unhandledRejection', error);
  });

  process.on('uncaughtException', (error: Error) => {
    logger.error('uncaughtException', error);
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  writeRestDocs(app, config);

  const port = config.get<number>('port');
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}

bootstrap().catch((error) => console.error(error));
