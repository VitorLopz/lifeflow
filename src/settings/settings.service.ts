import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async get(userId: string) {
    // Contas criadas antes de existir o modelo Settings não teriam registro —
    // por isso o upsert em vez de um simples findUnique.
    return this.prisma.settings.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
  }

  update(userId: string, data: any) {
    return this.prisma.settings.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });
  }
}
