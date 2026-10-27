import {
  INestApplication,
  Logger,
} from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

const logger = new Logger('Swagger');

export const swaggerConfiguration = (
  app: INestApplication,
): void => {
  const config = new DocumentBuilder()
    .setTitle('FleetCore API')
    .setDescription(
      'API REST para la gestión de vehículos, mecánicos, talleres y mantenimientos de FleetCore.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Introduce el JWT obtenido al iniciar sesión',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup(
    'api/docs',
    app,
    document,
  );

  logger.log(
    'Documentación disponible en /api/docs',
  );
};