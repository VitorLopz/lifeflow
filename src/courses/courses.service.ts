import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class CoursesService extends BaseCrudService {
  protected modelName = 'course';
  constructor(prisma: PrismaService) { super(prisma); }

  private withComputedProgress(data: any) {
    if (data.totalLessons && data.totalLessons > 0 && data.currentLesson != null) {
      data.progress = Math.min(100, Math.round((data.currentLesson / data.totalLessons) * 100));
    }
    return data;
  }

  async create(userId: string, data: any) {
    return super.create(userId, this.withComputedProgress(data));
  }

  async update(userId: string, id: string, data: any) {
    if (data.currentLesson != null && data.totalLessons == null) {
      const existing = await this.findOneOrThrow(userId, id);
      data.totalLessons = (existing as any).totalLessons;
    }
    return super.update(userId, id, this.withComputedProgress(data));
  }
}
