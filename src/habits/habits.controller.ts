import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@UseGuards(JwtAuthGuard)
@Controller('habits')
export class HabitsController {
  constructor(private service: HabitsService) {}

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.service.findAllWithLogs(userId);
  }

  @Post()
  create(@CurrentUser('id') userId: string, @Body() dto: CreateHabitDto) {
    return this.service.create(userId, dto as any);
  }

  @Patch(':id')
  update(@CurrentUser('id') userId: string, @Param('id') id: string, @Body() dto: UpdateHabitDto) {
    return this.service.update(userId, id, dto as any);
  }

  @Delete(':id')
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.service.remove(userId, id);
  }

  // POST /habits/:id/toggle?date=2026-07-16  (sem "date" assume hoje)
  @Post(':id/toggle')
  toggle(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Query('date') date?: string,
  ) {
    return this.service.toggleLog(userId, id, date || new Date().toISOString().slice(0, 10));
  }

  @Get(':id/streak')
  streak(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.service.computeStreak(userId, id).then((streak) => ({ streak }));
  }
}
