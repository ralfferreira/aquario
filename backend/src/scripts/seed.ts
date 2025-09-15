import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding...');

  await prisma.publicacao.deleteMany();
  await prisma.itemAchadoEPerdido.deleteMany();
  await prisma.vaga.deleteMany();
  await prisma.projeto.deleteMany();
  await prisma.membroEntidade.deleteMany();
  await prisma.entidade.deleteMany();
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
      nome: 'Thais',
      email: 'thais@ci.ufpb.br',
      senhaHash: passwordHash,
      papel: 'DOCENTE' as const,
      permissoes: [],
      eVerificado: true,
      centroId: ci.id,
    },
    {
      nome: 'Itamar',
      email: 'itamar@aquario.com',
      matricula: '20220060783',
      senhaHash: passwordHash,
      papel: 'DISCENTE' as const,
      permissoes: [],
      eVerificado: true,
      centroId: ci.id,
    },
    {
      nome: 'Usuário de Teste',
      email: 'teste@aquario.com',
      matricula: '20220000000',
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

  for (const userData of usersData) {
    try {
      await prisma.usuario.create({ data: userData });
      console.log(`- Usuário '${userData.nome}' criado com sucesso.`);
    } catch (error) {
      console.error(`Falha ao criar o usuário '${userData.nome}':`, error);
      throw error;
    }
  }

  console.log('Usuários criados.');

  const user = await prisma.usuario.findUnique({ where: { email: 'teste@aquario.com' } });
  const tadea = await prisma.usuario.findUnique({ where: { email: 'tadea@ci.ufpb.br' } });
  const rivailda = await prisma.usuario.findUnique({ where: { email: 'rivailda@ci.ufpb.br' } });
  const cc = await prisma.curso.findUnique({ where: { nome: 'Ciência da Computação' } });

  const thais = await prisma.usuario.findUnique({ where: { email: 'thais@ci.ufpb.br' } });
  const itamar = await prisma.usuario.findUnique({ where: { email: 'itamar@aquario.com' } });

  if (!user || !tadea || !rivailda || !cc || !thais || !itamar) throw new Error('Erro ao buscar entidades no seed.');

  const aria = await prisma.entidade.create({
    data: {
      nome: 'ARIA - Laboratório de Aplicações de Inteligência Artificial',
      tipo: 'LABORATORIO',
      centroId: ci.id,
      criadorId: thais.id,
    },
  });

  const tail = await prisma.entidade.create({
    data: {
      nome: 'TAIL - Liga Acadêmica de IA e Lógica',
      tipo: 'LIGA_ACADEMICA',
      centroId: ci.id,
      criadorId: itamar.id,
    },
  });

  console.log('Entidades de exemplo criadas.');

  const membrosData = [
    { usuarioId: thais.id, entidadeId: aria.id, papel: 'ADMIN' as const, nome: 'Thais no ARIA' },
    { usuarioId: itamar.id, entidadeId: tail.id, papel: 'ADMIN' as const, nome: 'Itamar no TAIL' },
  ];

  for (const membroData of membrosData) {
    try {
      const { nome, ...rest } = membroData;
      await prisma.membroEntidade.create({ data: rest });
      console.log(`- Membro '${nome}' criado com sucesso.`);
    } catch (error) {
      console.error(`Falha ao criar o membro '${membroData.nome}':`, error);
      throw error;
    }
  }

  console.log('Membros de entidades criados.');

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
