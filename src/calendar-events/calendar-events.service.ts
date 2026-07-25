import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class CalendarEventsService extends BaseCrudService {
  protected modelName = 'calendarEvent';
  constructor(prisma: PrismaService) { super(prisma); }
}
