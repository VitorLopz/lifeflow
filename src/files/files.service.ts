import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class FileMetasService extends BaseCrudService {
  protected modelName = 'fileMeta';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
