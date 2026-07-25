import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class BooksService extends BaseCrudService {
  protected modelName = 'book';
  constructor(prisma: PrismaService) { super(prisma); }

  private withComputedProgress(data: any) {
    if (data.totalPages && data.totalPages > 0 && data.currentPage != null) {
      data.progress = Math.min(100, Math.round((data.currentPage / data.totalPages) * 100));
    }
    return data;
  }

  async create(userId: string, data: any) {
    return super.create(userId, this.withComputedProgress(data));
  }

  async update(userId: string, id: string, data: any) {
    // Se só currentPage foi enviado no PATCH, busca totalPages já salvo para recalcular.
    if (data.currentPage != null && data.totalPages == null) {
      const existing = await this.findOneOrThrow(userId, id);
      data.totalPages = (existing as any).totalPages;
    }
    return super.update(userId, id, this.withComputedProgress(data));
  }
}
