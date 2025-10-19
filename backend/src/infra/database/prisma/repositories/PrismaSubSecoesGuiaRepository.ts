import { ISubSecoesGuiaRepository } from '@/domain/guias/repositories/ISubSecoesGuiaRepository';
import { prisma } from '..';
import { SubSecaoGuia } from '@/domain/guias/entities/SubSecaoGuia';
import { logger } from '@/infra/logger';

const log = logger.child('repository:subsecoes-guia');

export class PrismaSubSecoesGuiaRepository implements ISubSecoesGuiaRepository {
  async create(subSecaoGuia: SubSecaoGuia): Promise<void> {
    log.info('Criando subseção de guia', {
      id: subSecaoGuia.id,
      secaoId: subSecaoGuia.props.secaoId,
    });

    await prisma.subSecaoGuia.create({
      data: {
        id: subSecaoGuia.id,
        secaoId: subSecaoGuia.props.secaoId,
        titulo: subSecaoGuia.props.titulo,
        slug: subSecaoGuia.props.slug,
        ordem: subSecaoGuia.props.ordem,
        conteudo: subSecaoGuia.props.conteudo,
        status: subSecaoGuia.props.status,
        criadoEm: subSecaoGuia.props.criadoEm,
      },
    });
  }

  async findMany(): Promise<SubSecaoGuia[]> {
    log.debug('Listando subseções de guia');

    const subSecoes = await prisma.subSecaoGuia.findMany({
      orderBy: {
        ordem: 'asc',
      },
    });

    log.info('Subseções carregadas', { quantidade: subSecoes.length });
    return subSecoes.map(subSecao =>
      SubSecaoGuia.create(
        {
          secaoId: subSecao.secaoId,
          titulo: subSecao.titulo,
          slug: subSecao.slug,
          ordem: subSecao.ordem,
          conteudo: subSecao.conteudo,
          status: subSecao.status,
          criadoEm: subSecao.criadoEm,
          atualizadoEm: subSecao.atualizadoEm,
        },
        subSecao.id
      )
    );
  }

  async findBySecaoId(secaoId: string): Promise<SubSecaoGuia[]> {
    log.debug('Listando subseções por seção', { secaoId });

    const subSecoes = await prisma.subSecaoGuia.findMany({
      where: { secaoId },
      orderBy: {
        ordem: 'asc',
      },
    });

    log.info('Subseções carregadas por seção', { secaoId, quantidade: subSecoes.length });
    return subSecoes.map(subSecao =>
      SubSecaoGuia.create(
        {
          secaoId: subSecao.secaoId,
          titulo: subSecao.titulo,
          slug: subSecao.slug,
          ordem: subSecao.ordem,
          conteudo: subSecao.conteudo,
          status: subSecao.status,
          criadoEm: subSecao.criadoEm,
          atualizadoEm: subSecao.atualizadoEm,
        },
        subSecao.id
      )
    );
  }

  async findById(id: string): Promise<SubSecaoGuia | null> {
    log.debug('Buscando subseção por ID', { id });

    const subSecao = await prisma.subSecaoGuia.findUnique({
      where: { id },
    });

    if (!subSecao) {
      log.warn('Subseção não encontrada', { id });
      return null;
    }

    return SubSecaoGuia.create(
      {
        secaoId: subSecao.secaoId,
        titulo: subSecao.titulo,
        slug: subSecao.slug,
        ordem: subSecao.ordem,
        conteudo: subSecao.conteudo,
        status: subSecao.status,
        criadoEm: subSecao.criadoEm,
        atualizadoEm: subSecao.atualizadoEm,
      },
      subSecao.id
    );
  }

  async save(subSecaoGuia: SubSecaoGuia): Promise<void> {
    log.info('Atualizando subseção de guia', { id: subSecaoGuia.id });

    await prisma.subSecaoGuia.update({
      where: {
        id: subSecaoGuia.id,
      },
      data: {
        titulo: subSecaoGuia.props.titulo,
        slug: subSecaoGuia.props.slug,
        ordem: subSecaoGuia.props.ordem,
        conteudo: subSecaoGuia.props.conteudo,
        status: subSecaoGuia.props.status,
      },
    });
  }

  async delete(id: string): Promise<void> {
    log.warn('Removendo subseção de guia', { id });

    await prisma.subSecaoGuia.delete({
      where: { id },
    });
  }
}
