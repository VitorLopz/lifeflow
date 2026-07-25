import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class RunsService extends BaseCrudService {
  protected modelName = 'run';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
