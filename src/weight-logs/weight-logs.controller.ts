import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { WeightLogsService } from './weight-logs.service';
import { UpsertWeightLogDto } from './dto/upsert-weight-log.dto';

@UseGuards(JwtAuthGuard)
@Controller('weight-logs')
export class WeightLogsController {
  constructor(private service: WeightLogsService) {}

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.service.findAll(userId);
  }

  @Post()
  upsert(@CurrentUser('id') userId: string, @Body() dto: UpsertWeightLogDto) {
    return this.service.upsert(userId, dto);
  }

  @Delete(':id')
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.service.remove(userId, id);
  }
}
