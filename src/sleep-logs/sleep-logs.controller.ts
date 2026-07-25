import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { SleepLogsService } from './sleep-logs.service';
import { UpsertSleepLogDto } from './dto/upsert-sleep-log.dto';

@UseGuards(JwtAuthGuard)
@Controller('sleep-logs')
export class SleepLogsController {
  constructor(private service: SleepLogsService) {}

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.service.findAll(userId);
  }

  @Post()
  upsert(@CurrentUser('id') userId: string, @Body() dto: UpsertSleepLogDto) {
    return this.service.upsert(userId, dto);
  }

  @Delete(':id')
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.service.remove(userId, id);
  }
}
