import { ISubSecoesGuiaRepository } from '@/domain/guias/repositories/ISubSecoesGuiaRepository';
import { prisma } from '..';
import { SubSecaoGuia } from '@/domain/guias/entities/SubSecaoGuia';

export class PrismaSubSecoesGuiaRepository implements ISubSecoesGuiaRepository {
  async create(subSecaoGuia: SubSecaoGuia): Promise<void> {
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
    const subSecoes = await prisma.subSecaoGuia.findMany({
      orderBy: {
        ordem: 'asc',
      },
    });

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
    const subSecoes = await prisma.subSecaoGuia.findMany({
      where: { secaoId },
      orderBy: {
        ordem: 'asc',
      },
    });

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
    const subSecao = await prisma.subSecaoGuia.findUnique({
      where: { id },
    });

    if (!subSecao) {
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
    await prisma.subSecaoGuia.delete({
      where: { id },
    });
  }
}
