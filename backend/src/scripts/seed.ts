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

  const usersData = [
    {
      nome: 'Usuário de Teste',
      email: 'teste@aquario.com',
      senhaHash: passwordHash,
      papel: 'DISCENTE' as const,
      permissoes: [],
      eVerificado: true,
      centroId: ci.id,
    },
    {
      nome: 'Tadea Silva',
      email: 'tadea@ci.ufpb.br',
      senhaHash: passwordHash,
      papel: 'DOCENTE' as const,
      permissoes: ['ADMIN'],
      eVerificado: true,
      centroId: ci.id,
    },
    {
      nome: 'Rivailda Rocha',
      email: 'rivailda@ci.ufpb.br',
      senhaHash: passwordHash,
      papel: 'DOCENTE' as const,
      permissoes: ['ADMIN'],
      eVerificado: true,
      centroId: ci.id,
    },
  ];

  await prisma.usuario.createMany({
    data: usersData,
  });

  const user = await prisma.usuario.findUnique({ where: { email: 'teste@aquario.com' } });
  const tadea = await prisma.usuario.findUnique({ where: { email: 'tadea@ci.ufpb.br' } });
  const rivailda = await prisma.usuario.findUnique({ where: { email: 'rivailda@ci.ufpb.br' } });
  const cc = await prisma.curso.findUnique({ where: { nome: 'Ciência da Computação' } });

  if (!user || !tadea || !rivailda || !cc) throw new Error('Erro ao buscar entidades no seed.');

  console.log(`
--- IDs para Teste ---
`);
  console.log(`Centro de Informática (centroId): ${ci.id}`);
  console.log(`Curso de CC (cursoId):          ${cc.id}`);
  console.log(`Usuário de Teste (NÃO AUTORIZADO): ${user.id}`);
  console.log(`Usuário Tadea (AUTORIZADO):       ${tadea.id}`);
  console.log(`Usuário Rivailda (AUTORIZADO):    ${rivailda.id}`);
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
