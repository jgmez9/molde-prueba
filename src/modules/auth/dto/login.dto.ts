import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Correo electrónico registrado',
    example: 'carlos@fleetcore.com',
  })
  @IsEmail()
  @MaxLength(150)
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'FleetCore123',
    writeOnly: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  password: string;
}