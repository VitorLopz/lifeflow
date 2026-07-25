import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class MealsService extends BaseCrudService {
  protected modelName = 'meal';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
