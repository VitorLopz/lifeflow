import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private service: SettingsService) {}

  @Get()
  get(@CurrentUser('id') userId: string) {
    return this.service.get(userId);
  }

  @Patch()
  update(@CurrentUser('id') userId: string, @Body() dto: UpdateSettingsDto) {
    return this.service.update(userId, dto);
  }
}
