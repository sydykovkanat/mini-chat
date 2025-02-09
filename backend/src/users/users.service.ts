import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto, UserDto } from './dtos/user.dto';
import { compare, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS = 10;

  constructor(private prismaService: PrismaService) {}

  async getUser(params: { id?: string; email?: string }): Promise<User | null> {
    const { id, email } = params;
    if (!id && !email) {
      throw new Error('Необходимо указать id или email');
    }

    return this.prismaService.user.findFirst({
      where: {
        id: id ?? undefined,
        email: email ?? undefined,
      },
    });
  }

  async register(dto: UserDto) {
    const existingUser = await this.getUser({ email: dto.email });
    if (existingUser) {
      throw new BadRequestException('Пользователь с таким email уже существует');
    }

    const hashedPassword = await hash(dto.password, this.SALT_ROUNDS);
    const token = randomUUID();

    return this.prismaService.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        displayName: dto.displayName,
        token,
      },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.getUser({ email: dto.email });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Неверный пароль');
    }

    const token = randomUUID();
    return this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        token,
      },
    });
  }
}
