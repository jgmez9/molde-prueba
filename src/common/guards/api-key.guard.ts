import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const apiKey = request.headers['x-api-key'];

    if (
      typeof apiKey !== 'string' ||
      apiKey.length === 0
    ) {
      throw new UnauthorizedException(
        'Se requiere una API Key válida',
      );
    }

    const validApiKeys =
      this.configService.getOrThrow<string[]>(
        'api.keys',
      );

    if (!validApiKeys.includes(apiKey)) {
      throw new UnauthorizedException(
        'La API Key es inválida',
      );
    }

    return true;
  }
}