import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SleepLogsService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.sleepLog.findMany({ where: { userId }, orderBy: { date: 'desc' } });
  }

  // Um registro por dia — se já existir, atualiza em vez de duplicar.
  upsert(userId: string, dto: { date: string; hours: number; quality: number }) {
    const date = new Date(dto.date);
    return this.prisma.sleepLog.upsert({
      where: { userId_date: { userId, date } },
      create: { userId, date, hours: dto.hours, quality: dto.quality },
      update: { hours: dto.hours, quality: dto.quality },
    });
  }

  async remove(userId: string, id: string) {
    const log = await this.prisma.sleepLog.findUnique({ where: { id } });
    if (log?.userId === userId) await this.prisma.sleepLog.delete({ where: { id } });
    return { id };
  }
}
