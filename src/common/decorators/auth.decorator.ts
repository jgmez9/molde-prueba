import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role } from '../enum/role.enum.js';
import { Roles } from './roles.decorator.js';

export const Auth = (...roles: Role[]) =>
  applyDecorators(
    Roles(...roles),
    ApiBearerAuth('access-token'),
    ApiUnauthorizedResponse({
      description: 'Token ausente, inválido o expirado',
    }),
    ApiForbiddenResponse({
      description: 'No tienes permisos para esta operación',
    }),
  );