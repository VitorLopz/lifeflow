import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class TransactionsService extends BaseCrudService {
  protected modelName = 'transaction';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
