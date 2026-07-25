import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class GoalsService extends BaseCrudService {
  protected modelName = 'goal';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
