import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class JournalEntrysService extends BaseCrudService {
  protected modelName = 'journalEntry';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
