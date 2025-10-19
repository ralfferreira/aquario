import { IPublicacoesRepository } from '@/domain/publicacoes/repositories/IPublicacoesRepository';
import { prisma } from '..';
import { Publicacao } from '@/domain/publicacoes/entities/Publicacao';
import { logger } from '@/infra/logger';

const log = logger.child('repository:publicacoes');

export class PrismaPublicacoesRepository implements IPublicacoesRepository {
  async create(publicacao: Publicacao): Promise<void> {
    log.info('Criando publicação', {
      id: publicacao.id,
      autorId: publicacao.props.autor.id,
    });

    await prisma.publicacao.create({
      data: {
        id: publicacao.id,
        titulo: publicacao.props.titulo,
        conteudo: publicacao.props.conteudo,
        autorId: publicacao.props.autor.id,
        centroId: publicacao.props.centroId,
        criadoEm: publicacao.props.criadoEm,
      },
    });
  }

  async findMany(): Promise<Publicacao[]> {
    log.debug('Buscando lista de publicações');

    const publicacoes = await prisma.publicacao.findMany({
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
            urlFotoPerfil: true,
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });

    return publicacoes.map(publicacao =>
      Publicacao.create(
        {
          titulo: publicacao.titulo,
          conteudo: publicacao.conteudo,
          autor: publicacao.autor,
          centroId: publicacao.centroId,
          criadoEm: publicacao.criadoEm,
          atualizadoEm: publicacao.atualizadoEm,
        },
        publicacao.id
      )
    );
  }

  async findById(id: string): Promise<Publicacao | null> {
    log.debug('Buscando publicação por ID', { id });

    const publicacao = await prisma.publicacao.findUnique({
      where: { id },
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
            urlFotoPerfil: true,
          },
        },
      },
    });

    if (!publicacao) {
      log.warn('Publicação não encontrada', { id });
      return null;
    }

    return Publicacao.create(
      {
        titulo: publicacao.titulo,
        conteudo: publicacao.conteudo,
        autor: publicacao.autor,
        centroId: publicacao.centroId,
        criadoEm: publicacao.criadoEm,
        atualizadoEm: publicacao.atualizadoEm,
      },
      publicacao.id
    );
  }

  async save(publicacao: Publicacao): Promise<void> {
    log.info('Atualizando publicação', { id: publicacao.id });

    await prisma.publicacao.update({
      where: {
        id: publicacao.id,
      },
      data: {
        titulo: publicacao.props.titulo,
        conteudo: publicacao.props.conteudo,
      },
    });
  }

  async delete(id: string): Promise<void> {
    log.warn('Removendo publicação', { id });

    await prisma.publicacao.delete({
      where: { id },
    });
  }
}
