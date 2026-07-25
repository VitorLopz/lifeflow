import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('me')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  profile(@CurrentUser('id') userId: string) {
    return this.service.getProfile(userId);
  }

  // Endpoint principal usado pelo frontend no boot do app.
  @Get('all')
  all(@CurrentUser('id') userId: string) {
    return this.service.getEverything(userId);
  }
}
