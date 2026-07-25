import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class HabitsService extends BaseCrudService {
  protected modelName = 'habit';

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  // Alterna a marcação de "feito hoje" (ou em qualquer data) para um hábito.
  // Usa @@unique([habitId, date]) do Prisma pra nunca duplicar log no mesmo dia.
  async toggleLog(userId: string, habitId: string, dateStr: string) {
    await this.findOneOrThrow(userId, habitId);
    const date = new Date(dateStr);

    const existing = await this.prisma.habitLog.findUnique({
      where: { habitId_date: { habitId, date } },
    });

    if (existing) {
      await this.prisma.habitLog.delete({ where: { id: existing.id } });
      await this.adjustLinkedGoals(habitId, -1);
      return { toggled: false };
    }

    await this.prisma.habitLog.create({ data: { habitId, date, userId } });
    await this.adjustLinkedGoals(habitId, 1);
    return { toggled: true };
  }

  // Metas vinculadas a um hábito (goal.habitId) sobem/descem sozinhas
  // conforme o hábito é marcado/desmarcado no dia — ex.: meta "correr 3x
  // por semana" vinculada ao hábito "corrida" ganha +1 automaticamente.
  private async adjustLinkedGoals(habitId: string, direction: 1 | -1) {
    const goals = await this.prisma.goal.findMany({ where: { habitId } });
    for (const goal of goals) {
      const next = Math.max(0, Math.min(goal.target, goal.current + direction * goal.step));
      await this.prisma.goal.update({ where: { id: goal.id }, data: { current: next } });
    }
  }

  // Calcula o streak atual (dias consecutivos até hoje, permitindo que o dia
  // de hoje ainda não tenha sido marcado sem quebrar a sequência).
  async computeStreak(userId: string, habitId: string): Promise<number> {
    await this.findOneOrThrow(userId, habitId);
    const logs = await this.prisma.habitLog.findMany({
      where: { habitId },
      orderBy: { date: 'desc' },
      select: { date: true },
    });
    const dates = new Set(logs.map((l) => l.date.toISOString().slice(0, 10)));

    let streak = 0;
    let cursor = new Date();
    const todayKey = cursor.toISOString().slice(0, 10);
    if (!dates.has(todayKey)) cursor.setDate(cursor.getDate() - 1);

    while (dates.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  async findAllWithLogs(userId: string) {
    return this.prisma.habit.findMany({
      where: { userId },
      include: { logs: { select: { date: true } } },
    });
  }
}
