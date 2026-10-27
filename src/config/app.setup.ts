import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import helmet from 'helmet';
import { AllExceptionFilter } from '../common/filters/all-exceptions.filter.js';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor.js';

export const setupApp = (
  app: INestApplication,
): void => {
  // Cabeceras HTTP de seguridad.
  app.use(helmet());

  // Prefijo global de la API.
  app.setGlobalPrefix('api/v1');

  // Validación y transformación de DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Formato uniforme de errores.
  app.useGlobalFilters(
    new AllExceptionFilter(),
  );

  // Formato uniforme de respuestas y serialización.
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ClassSerializerInterceptor(
      app.get(Reflector),
    ),
  );

  // Cierre ordenado de recursos.
  app.enableShutdownHooks();
};