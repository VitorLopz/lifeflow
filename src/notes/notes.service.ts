import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class NotesService extends BaseCrudService {
  protected modelName = 'note';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
