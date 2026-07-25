import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Serviço genérico de CRUD escopado por usuário.
 * Cada módulo de recurso (tasks, habits, goals, ...) estende essa classe
 * passando o nome do model do Prisma (ex.: 'task', 'habit', 'goal').
 * Isso evita repetir a mesma lógica de "buscar só o que é do usuário logado"
 * dezessete vezes.
 */
export abstract class BaseCrudService<T = any> {
  protected abstract modelName: string;

  constructor(protected prisma: PrismaService) {}

  private get model(): any {
    return (this.prisma as any)[this.modelName];
  }

  async findAll(userId: string, orderBy: Record<string, 'asc' | 'desc'> = { id: 'desc' }): Promise<T[]> {
    return this.model.findMany({ where: { userId }, orderBy });
  }

  async findOneOrThrow(userId: string, id: string): Promise<T> {
    const item = await this.model.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Registro não encontrado');
    if (item.userId !== userId) throw new ForbiddenException('Você não tem acesso a esse registro');
    return item;
  }

  async create(userId: string, data: Partial<T>): Promise<T> {
    return this.model.create({ data: { ...data, userId } });
  }

  async update(userId: string, id: string, data: Partial<T>): Promise<T> {
    await this.findOneOrThrow(userId, id); // garante posse do registro antes de alterar
    return this.model.update({ where: { id }, data });
  }

  async remove(userId: string, id: string): Promise<{ id: string }> {
    await this.findOneOrThrow(userId, id);
    await this.model.delete({ where: { id } });
    return { id };
  }
}
