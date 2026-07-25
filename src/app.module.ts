import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';

import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { GoalsModule } from './goals/goals.module';
import { HabitsModule } from './habits/habits.module';
import { TransactionsModule } from './transactions/transactions.module';
import { JournalEntrysModule } from './journal/journal.module';
import { NotesModule } from './notes/notes.module';
import { BooksModule } from './books/books.module';
import { CoursesModule } from './courses/courses.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { RunsModule } from './runs/runs.module';
import { SleepLogsModule } from './sleep-logs/sleep-logs.module';
import { MealsModule } from './meals/meals.module';
import { WeightLogsModule } from './weight-logs/weight-logs.module';
import { WaterModule } from './water/water.module';
import { FileMetasModule } from './files/files.module';
import { CalendarEventsModule } from './calendar-events/calendar-events.module';
import { AssistantModule } from './assistant/assistant.module';

@Module({
  imports: [
    // Limita a 100 requisições por minuto por IP — protege login/API de abuso.
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    SettingsModule,
    TasksModule,
    ProjectsModule,
    GoalsModule,
    HabitsModule,
    TransactionsModule,
    JournalEntrysModule,
    NotesModule,
    BooksModule,
    CoursesModule,
    WorkoutsModule,
    RunsModule,
    SleepLogsModule,
    MealsModule,
    WeightLogsModule,
    WaterModule,
    FileMetasModule,
    CalendarEventsModule,
    AssistantModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
