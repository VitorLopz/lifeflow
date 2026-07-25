import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { WaterService } from './water.service';
import { UpsertWaterDto } from './dto/upsert-water.dto';

@UseGuards(JwtAuthGuard)
@Controller('water')
export class WaterController {
  constructor(private service: WaterService) {}

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.service.findAll(userId);
  }

  @Post()
  upsert(@CurrentUser('id') userId: string, @Body() dto: UpsertWaterDto) {
    return this.service.upsert(userId, dto);
  }
}
