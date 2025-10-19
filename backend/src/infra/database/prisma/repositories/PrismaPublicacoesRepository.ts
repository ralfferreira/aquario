import { IPublicacoesRepository } from '@/domain/publicacoes/repositories/IPublicacoesRepository';
import { prisma } from '..';
import { Publicacao } from '@/domain/publicacoes/entities/Publicacao';

export class PrismaPublicacoesRepository implements IPublicacoesRepository {
  async create(publicacao: Publicacao): Promise<void> {
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
    await prisma.publicacao.delete({
      where: { id },
    });
  }
}
