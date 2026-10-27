import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';
import { setupApp } from './config/app.setup.js';
import { swaggerConfiguration } from './config/swagger.config.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  setupApp(app);

  swaggerConfiguration(app);

  await app.listen(
    config.getOrThrow<number>('app.port'),
  );
}

await bootstrap();