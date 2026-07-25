import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class ProjectsService extends BaseCrudService {
  protected modelName = 'project';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
