import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const existingUser = await this.findByEmail(
      data.email!,
    );

    if (existingUser) {
      throw new ConflictException(
        'Ya existe un usuario con ese correo electrónico',
      );
    }

    try {
      const user = this.userRepository.create(data);

      return await this.userRepository.save(user);
    } catch (error: unknown) {
      // PostgreSQL: unique_violation.
      if (
        error instanceof QueryFailedError &&
        (error.driverError as { code?: string }).code ===
          '23505'
      ) {
        throw new ConflictException(
          'Ya existe un usuario con ese correo electrónico',
        );
      }

      throw new InternalServerErrorException(
        'No fue posible crear el usuario',
      );
    }
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }
}