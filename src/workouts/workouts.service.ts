import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class WorkoutsService extends BaseCrudService {
  protected modelName = 'workout';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
