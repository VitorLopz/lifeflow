import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WeightLogsService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.weightLog.findMany({ where: { userId }, orderBy: { date: 'asc' } });
  }

  upsert(userId: string, dto: { date: string; kg: number; bodyFat?: number }) {
    const date = new Date(dto.date);
    return this.prisma.weightLog.upsert({
      where: { userId_date: { userId, date } },
      create: { userId, date, kg: dto.kg, bodyFat: dto.bodyFat },
      update: { kg: dto.kg, bodyFat: dto.bodyFat },
    });
  }

  async remove(userId: string, id: string) {
    const log = await this.prisma.weightLog.findUnique({ where: { id } });
    if (log?.userId === userId) await this.prisma.weightLog.delete({ where: { id } });
    return { id };
  }
}
