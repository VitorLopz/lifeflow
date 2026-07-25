import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  private async signToken(userId: string, email: string) {
    const token = await this.jwt.signAsync({ sub: userId, email });
    return { accessToken: token };
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Já existe uma conta com esse e-mail');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        name: dto.name,
        settings: { create: {} }, // cria configurações padrão junto
      },
    });

    const { accessToken } = await this.signToken(user.id, user.email);
    return { accessToken, user: { id: user.id, email: user.email, name: user.name } };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('E-mail ou senha inválidos');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('E-mail ou senha inválidos');

    const { accessToken } = await this.signToken(user.id, user.email);
    return { accessToken, user: { id: user.id, email: user.email, name: user.name } };
  }
}
