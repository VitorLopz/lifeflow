import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/base-crud.service';

@Injectable()
export class TasksService extends BaseCrudService {
  protected modelName = 'task';

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  // Sobrescreve create/update/remove para recalcular o progresso do projeto
  // vinculado sempre que uma tarefa é criada, concluída/reaberta, movida
  // de projeto ou excluída — mantendo o progresso do card do projeto
  // sempre fiel ao que está realmente concluído.
  async create(userId: string, data: any) {
    const task = await super.create(userId, data);
    if (task.projectId) await this.recalcProjectProgress(task.projectId);
    return task;
  }

  async update(userId: string, id: string, data: any) {
    const before = await this.findOneOrThrow(userId, id);
    const task = await super.update(userId, id, data);
    // Recalcula o projeto antigo (se a tarefa foi movida para outro projeto)
    // e o novo projeto vinculado.
    if (before.projectId && before.projectId !== task.projectId) {
      await this.recalcProjectProgress(before.projectId);
    }
    if (task.projectId) await this.recalcProjectProgress(task.projectId);
    return task;
  }

  async remove(userId: string, id: string) {
    const before = await this.findOneOrThrow(userId, id);
    const result = await super.remove(userId, id);
    if (before.projectId) await this.recalcProjectProgress(before.projectId);
    return result;
  }

  private async recalcProjectProgress(projectId: string) {
    const tasks = await this.prisma.task.findMany({ where: { projectId } });
    if (tasks.length === 0) return; // sem tarefas vinculadas, mantém o progresso manual
    const done = tasks.filter((t) => t.done).length;
    const progress = Math.round((done / tasks.length) * 100);
    await this.prisma.project.update({ where: { id: projectId }, data: { progress } });
  }
}
