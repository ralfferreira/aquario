import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding...');

  // Limpar dados existentes para evitar duplicatas
  await prisma.publicacao.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.curso.deleteMany();
  await prisma.centro.deleteMany();
  await prisma.campus.deleteMany();

  console.log('Dados antigos limpos.');

  const campus1 = await prisma.campus.create({
    data: {
      nome: 'Campus I - João Pessoa',
    },
  });

  const ci = await prisma.centro.create({
    data: {
      nome: 'Centro de Informática',
      sigla: 'CI',
      campusId: campus1.id,
    },
  });

  await prisma.curso.createMany({
    data: [
      { nome: 'Ciência da Computação', centroId: ci.id },
      { nome: 'Engenharia de Computação', centroId: ci.id },
      { nome: 'Matemática Computacional', centroId: ci.id },
      { nome: 'Ciência de Dados e Inteligência Artificial', centroId: ci.id },
    ],
  });

  console.log('Campi, Centros e Cursos criados.');

  const passwordHash = await hash('123456', 10);

  const user = await prisma.usuario.create({
    data: {
      nome: 'Usuário de Teste',
      email: 'teste@aquario.com',
      senhaHash: passwordHash,
      papel: 'DISCENTE',
      eVerificado: true,
      centroId: ci.id,
    },
  });

  console.log(`
--- IDs para Teste ---
`);
  console.log(`Centro de Informática (centroId): ${ci.id}`);
  console.log(`Usuário de Teste (autorId):      ${user.id}`);
  console.log(`
-----------------------
`);

  console.log('Seeding finalizado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
