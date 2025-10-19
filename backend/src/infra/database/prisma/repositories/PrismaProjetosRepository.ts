import { IProjetosRepository } from '@/domain/projetos/repositories/IProjetosRepository';
import { Projeto } from '@/domain/projetos/entities/Projeto';
import { prisma } from '..';
import { logger } from '@/infra/logger';

const log = logger.child('repository:projetos');

export class PrismaProjetosRepository implements IProjetosRepository {
  async findById(id: string): Promise<Projeto | null> {
    log.debug('Buscando projeto por ID', { id });

    const projeto = await prisma.projeto.findUnique({
      where: { id },
      include: {
        membros: true,
        criador: true,
      },
    });

    if (!projeto) {
      log.warn('Projeto não encontrado', { id });
      return null;
    }

    return Projeto.create(
      {
        ...projeto,
        membros: projeto.membros.map(membro => membro.id),
      },
      projeto.id
    );
  }

  async findMany(): Promise<Projeto[]> {
    log.debug('Listando projetos');

    const projetos = await prisma.projeto.findMany({
      include: {
        membros: true,
        criador: true,
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });

    log.info('Projetos carregados', { quantidade: projetos.length });
    return projetos.map(projeto =>
      Projeto.create(
        {
          ...projeto,
          membros: projeto.membros.map(membro => membro.id),
        },
        projeto.id
      )
    );
  }

  async create(projeto: Projeto): Promise<void> {
    log.info('Criando projeto', {
      id: projeto.id,
      criadorId: projeto.props.criadorId,
    });

    await prisma.projeto.create({
      data: {
        id: projeto.id,
        titulo: projeto.props.titulo,
        descricao: projeto.props.descricao,
        tipo: projeto.props.tipo,
        criadorId: projeto.props.criadorId,
        centroId: projeto.props.centroId,
        tags: projeto.props.tags,
        url: projeto.props.url,
        urlFoto: projeto.props.urlFoto,
        membros: {
          connect: projeto.props.membros?.map(id => ({ id })) || [],
        },
      },
    });
  }

  async save(projeto: Projeto): Promise<void> {
    const { membros, ...data } = projeto.props;

    log.info('Atualizando projeto', { id: projeto.id });

    await prisma.projeto.update({
      where: { id: projeto.id },
      data: {
        ...data,
        membros: {
          set: membros?.map(id => ({ id })) ?? [],
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    log.warn('Removendo projeto', { id });

    await prisma.projeto.delete({ where: { id } });
  }
}
