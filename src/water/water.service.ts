import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WaterService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.waterLog.findMany({ where: { userId }, orderBy: { date: 'desc' } });
  }

  upsert(userId: string, dto: { date: string; cups: number }) {
    const date = new Date(dto.date);
    return this.prisma.waterLog.upsert({
      where: { userId_date: { userId, date } },
      create: { userId, date, cups: dto.cups },
      update: { cups: dto.cups },
    });
  }
}
