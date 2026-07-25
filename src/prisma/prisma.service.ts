import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Serviço central de acesso ao banco. Todo módulo injeta o PrismaService
// em vez de instanciar o PrismaClient diretamente — isso garante uma
// única conexão compartilhada e facilita testes/mocks no futuro.
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
