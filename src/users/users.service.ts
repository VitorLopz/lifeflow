import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Um único round-trip que devolve tudo que o app precisa no boot,
  // já no formato que o frontend espera dentro de `DB`.
  async getEverything(userId: string) {
    const [
      tasks, projects, habits, habitLogs, transactions, goals,
      journal, notes, books, courses, workouts, runs, sleepLogs,
      meals, weight, water, files, settings, calendarEvents,
    ] = await Promise.all([
      this.prisma.task.findMany({ where: { userId }, orderBy: { due: 'asc' } }),
      this.prisma.project.findMany({ where: { userId } }),
      this.prisma.habit.findMany({ where: { userId } }),
      this.prisma.habitLog.findMany({ where: { userId } }),
      this.prisma.transaction.findMany({ where: { userId }, orderBy: { date: 'desc' } }),
      this.prisma.goal.findMany({ where: { userId } }),
      this.prisma.journalEntry.findMany({ where: { userId }, orderBy: { date: 'desc' } }),
      this.prisma.note.findMany({ where: { userId } }),
      this.prisma.book.findMany({ where: { userId } }),
      this.prisma.course.findMany({ where: { userId } }),
      this.prisma.workout.findMany({ where: { userId }, orderBy: { date: 'desc' } }),
      this.prisma.run.findMany({ where: { userId }, orderBy: { date: 'desc' } }),
      this.prisma.sleepLog.findMany({ where: { userId }, orderBy: { date: 'desc' } }),
      this.prisma.meal.findMany({ where: { userId } }),
      this.prisma.weightLog.findMany({ where: { userId }, orderBy: { date: 'asc' } }),
      this.prisma.waterLog.findMany({ where: { userId } }),
      this.prisma.fileMeta.findMany({ where: { userId } }),
      this.prisma.settings.upsert({ where: { userId }, create: { userId }, update: {} }),
      this.prisma.calendarEvent.findMany({ where: { userId }, orderBy: { date: 'asc' } }),
    ]);

    return {
      tasks, projects, habits, habitLogs, transactions, goals,
      journal, notes, books, courses, workouts, runs, sleepLogs,
      meals, weight, water, files, settings, calendarEvents,
    };
  }

  getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
  }
}
