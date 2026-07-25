import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

async function main() {
  const email = 'demo@lifeflow.app';
  const password = await bcrypt.hash('demo12345', 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password,
      name: 'Usuário Demo',
      settings: { create: {} },
    },
  });

  console.log(`Usuário demo pronto: ${email} / senha: demo12345`);

  await prisma.task.createMany({
    data: [
      { userId: user.id, title: 'Revisar proposta do projeto LifeFlow', category: 'Projetos', priority: 'alta', due: daysAgo(0), done: true },
      { userId: user.id, title: 'Estudar módulo de autenticação JWT', category: 'Estudos', priority: 'media', due: daysAgo(0), done: false },
      { userId: user.id, title: 'Enviar relatório financeiro mensal', category: 'Finanças', priority: 'alta', due: daysAgo(-1), done: false },
    ],
  });

  const habit = await prisma.habit.create({
    data: { userId: user.id, name: 'Beber água (2L)', icon: '💧' },
  });
  for (let i = 0; i < 5; i++) {
    await prisma.habitLog.create({ data: { habitId: habit.id, userId: user.id, date: daysAgo(i) } });
  }

  await prisma.transaction.createMany({
    data: [
      { userId: user.id, desc: 'Salário', category: 'Salário', type: 'receita', amount: 6200, date: daysAgo(10) },
      { userId: user.id, desc: 'Aluguel', category: 'Moradia', type: 'despesa', amount: -1600, date: daysAgo(8) },
    ],
  });

  await prisma.goal.create({
    data: { userId: user.id, title: 'Ler 20 livros', category: 'Educação', period: 'Anual', target: 20, current: 7 },
  });

  console.log('Seed concluído.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
