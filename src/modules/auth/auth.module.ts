import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfiguration } from '../../config/jwt.config.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [
    UsersModule,

    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: jwtConfiguration,
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService],
})
export class AuthModule {}