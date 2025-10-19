import { prisma } from '@/infra/database/prisma';

interface SearchResult {
  id: string;
  titulo?: string;
  nome?: string;
  descricao?: string;
  conteudo?: string;
  type: string;
  [key: string]: unknown;
}

class SearchUseCase {
  async execute(query: string): Promise<SearchResult[]> {
    if (!query) {
      return [];
    }

    const lowercasedQuery = query.toLowerCase();

    const [projetos, publicacoes, vagas, usuarios, entidades, guias] = await Promise.all([
      prisma.projeto.findMany({
        where: {
          OR: [
            { titulo: { contains: lowercasedQuery, mode: 'insensitive' } },
            { descricao: { contains: lowercasedQuery, mode: 'insensitive' } },
          ],
        },
      }),
      prisma.publicacao.findMany({
        where: {
          OR: [
            { titulo: { contains: lowercasedQuery, mode: 'insensitive' } },
            { conteudo: { contains: lowercasedQuery, mode: 'insensitive' } },
          ],
        },
      }),
      prisma.vaga.findMany({
        where: {
          OR: [
            { titulo: { contains: lowercasedQuery, mode: 'insensitive' } },
            { descricao: { contains: lowercasedQuery, mode: 'insensitive' } },
          ],
        },
      }),
      prisma.usuario.findMany({
        where: {
          nome: { contains: lowercasedQuery, mode: 'insensitive' },
        },
      }),
      prisma.entidade.findMany({
        where: {
          OR: [
            { nome: { contains: lowercasedQuery, mode: 'insensitive' } },
            { descricao: { contains: lowercasedQuery, mode: 'insensitive' } },
          ],
        },
      }),
      prisma.guia.findMany({
        where: {
          OR: [
            { titulo: { contains: lowercasedQuery, mode: 'insensitive' } },
            { descricao: { contains: lowercasedQuery, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    const results = [
      ...projetos.map(item => ({ ...item, type: 'projeto' })),
      ...publicacoes.map(item => ({ ...item, type: 'publicacao' })),
      ...vagas.map(item => ({ ...item, type: 'vaga' })),
      ...usuarios.map(item => ({ ...item, type: 'usuario' })),
      ...entidades.map(item => ({ ...item, type: 'entidade' })),
      ...guias.map(item => ({ ...item, type: 'guia' })),
    ];

    return results;
  }
}

export { SearchUseCase };
