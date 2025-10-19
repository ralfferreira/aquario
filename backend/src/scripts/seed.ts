import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding...');

  await prisma.subSecaoGuia.deleteMany();
  await prisma.secaoGuia.deleteMany();
  await prisma.guia.deleteMany();
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
      papelPlataforma: 'MASTER_ADMIN' as const,
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
      papelPlataforma: 'USER' as const,
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
      papelPlataforma: 'USER' as const,
    },
    {
      nome: 'Tadea Silva',
      email: 'tadea@ci.ufpb.br',
      senhaHash: passwordHash,
      papel: 'DOCENTE' as const,
      permissoes: ['ADMIN'],
      eVerificado: true,
      centroId: ci.id,
      papelPlataforma: 'USER' as const,
    },
    {
      nome: 'Rivailda Rocha',
      email: 'rivailda@ci.ufpb.br',
      senhaHash: passwordHash,
      papel: 'DOCENTE' as const,
      permissoes: ['ADMIN'],
      eVerificado: true,
      centroId: ci.id,
      papelPlataforma: 'USER' as const,
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

  const user = await prisma.usuario.findUnique({
    where: { email: 'teste@aquario.com' },
  });
  const tadea = await prisma.usuario.findUnique({
    where: { email: 'tadea@ci.ufpb.br' },
  });
  const rivailda = await prisma.usuario.findUnique({
    where: { email: 'rivailda@ci.ufpb.br' },
  });
  const cc = await prisma.curso.findUnique({
    where: { nome: 'Ciência da Computação' },
  });

  const thais = await prisma.usuario.findUnique({
    where: { email: 'thais@ci.ufpb.br' },
  });
  const itamar = await prisma.usuario.findUnique({
    where: { email: 'itamar@aquario.com' },
  });

  if (!user || !tadea || !rivailda || !cc || !thais || !itamar)
    throw new Error('Erro ao buscar entidades no seed.');

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
    {
      usuarioId: thais.id,
      entidadeId: aria.id,
      papel: 'ADMIN' as const,
      nome: 'Thais no ARIA',
    },
    {
      usuarioId: itamar.id,
      entidadeId: tail.id,
      papel: 'ADMIN' as const,
      nome: 'Itamar no TAIL',
    },
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

  // Create example guides
  const guia1 = await prisma.guia.create({
    data: {
      titulo: 'Guia de Introdução à Programação',
      slug: 'guia-introducao-programacao',
      descricao: 'Um guia completo para iniciantes em programação',
      status: 'ATIVO',
      cursoId: cc.id,
      tags: ['programação', 'iniciante', 'algoritmos'],
    },
  });

  const guia2 = await prisma.guia.create({
    data: {
      titulo: 'Estruturas de Dados Avançadas',
      slug: 'estruturas-dados-avancadas',
      descricao: 'Conceitos avançados de estruturas de dados',
      status: 'ATIVO',
      cursoId: cc.id,
      tags: ['estruturas de dados', 'algoritmos', 'avançado'],
    },
  });

  // Create sections for guia1
  const secao1 = await prisma.secaoGuia.create({
    data: {
      guiaId: guia1.id,
      titulo: 'Conceitos Básicos',
      slug: 'conceitos-basicos',
      ordem: 1,
      conteudo: '# Conceitos Básicos\n\nEste capítulo aborda os fundamentos da programação...',
      status: 'ATIVO',
    },
  });

  const secao2 = await prisma.secaoGuia.create({
    data: {
      guiaId: guia1.id,
      titulo: 'Variáveis e Tipos',
      slug: 'variaveis-tipos',
      ordem: 2,
      conteudo: '# Variáveis e Tipos\n\nAs variáveis são fundamentais na programação...',
      status: 'ATIVO',
    },
  });

  // Create subsections for secao1
  await prisma.subSecaoGuia.create({
    data: {
      secaoId: secao1.id,
      titulo: 'O que é Programação?',
      slug: 'o-que-e-programacao',
      ordem: 1,
      conteudo: '## O que é Programação?\n\nProgramação é o processo de criar instruções...',
      status: 'ATIVO',
    },
  });

  await prisma.subSecaoGuia.create({
    data: {
      secaoId: secao1.id,
      titulo: 'Algoritmos',
      slug: 'algoritmos',
      ordem: 2,
      conteudo: '## Algoritmos\n\nUm algoritmo é uma sequência de passos...',
      status: 'ATIVO',
    },
  });

  console.log('Guias de exemplo criados.');

  console.log(`
--- IDs para Teste ---
`);
  console.log(`Centro de Informática (centroId): ${ci.id}`);
  console.log(`Curso de CC (cursoId):          ${cc.id}`);
  console.log(`Usuário de Teste (NÃO AUTORIZADO): ${user.id}`);
  console.log(`Usuário Tadea (AUTORIZADO):       ${tadea.id}`);
  console.log(`Usuário Rivailda (AUTORIZADO):    ${rivailda.id}`);
  console.log(`Guia 1 (guiaId):                 ${guia1.id}`);
  console.log(`Guia 2 (guiaId):                 ${guia2.id}`);
  console.log(`Seção 1 (secaoId):               ${secao1.id}`);
  console.log(`Seção 2 (secaoId):               ${secao2.id}`);
  console.log(`
-----------------------
`);

  console.log('Seeding finalizado.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
