import { ISecoesGuiaRepository } from '@/domain/guias/repositories/ISecoesGuiaRepository';
import { prisma } from '..';
import { SecaoGuia } from '@/domain/guias/entities/SecaoGuia';

export class PrismaSecoesGuiaRepository implements ISecoesGuiaRepository {
  async create(secaoGuia: SecaoGuia): Promise<void> {
    await prisma.secaoGuia.create({
      data: {
        id: secaoGuia.id,
        guiaId: secaoGuia.props.guiaId,
        titulo: secaoGuia.props.titulo,
        slug: secaoGuia.props.slug,
        ordem: secaoGuia.props.ordem,
        conteudo: secaoGuia.props.conteudo,
        status: secaoGuia.props.status,
        criadoEm: secaoGuia.props.criadoEm,
      },
    });
  }

  async findMany(): Promise<SecaoGuia[]> {
    const secoes = await prisma.secaoGuia.findMany({
      orderBy: {
        ordem: 'asc',
      },
    });

    return secoes.map(secao =>
      SecaoGuia.create(
        {
          guiaId: secao.guiaId,
          titulo: secao.titulo,
          slug: secao.slug,
          ordem: secao.ordem,
          conteudo: secao.conteudo,
          status: secao.status,
          criadoEm: secao.criadoEm,
          atualizadoEm: secao.atualizadoEm,
        },
        secao.id
      )
    );
  }

  async findByGuiaId(guiaId: string): Promise<SecaoGuia[]> {
    const secoes = await prisma.secaoGuia.findMany({
      where: { guiaId },
      orderBy: {
        ordem: 'asc',
      },
    });

    return secoes.map(secao =>
      SecaoGuia.create(
        {
          guiaId: secao.guiaId,
          titulo: secao.titulo,
          slug: secao.slug,
          ordem: secao.ordem,
          conteudo: secao.conteudo,
          status: secao.status,
          criadoEm: secao.criadoEm,
          atualizadoEm: secao.atualizadoEm,
        },
        secao.id
      )
    );
  }

  async findById(id: string): Promise<SecaoGuia | null> {
    const secao = await prisma.secaoGuia.findUnique({
      where: { id },
    });

    if (!secao) {
      return null;
    }

    return SecaoGuia.create(
      {
        guiaId: secao.guiaId,
        titulo: secao.titulo,
        slug: secao.slug,
        ordem: secao.ordem,
        conteudo: secao.conteudo,
        status: secao.status,
        criadoEm: secao.criadoEm,
        atualizadoEm: secao.atualizadoEm,
      },
      secao.id
    );
  }

  async save(secaoGuia: SecaoGuia): Promise<void> {
    await prisma.secaoGuia.update({
      where: {
        id: secaoGuia.id,
      },
      data: {
        titulo: secaoGuia.props.titulo,
        slug: secaoGuia.props.slug,
        ordem: secaoGuia.props.ordem,
        conteudo: secaoGuia.props.conteudo,
        status: secaoGuia.props.status,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.secaoGuia.delete({
      where: { id },
    });
  }
}
