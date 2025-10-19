import { IGuiasRepository } from '@/domain/guias/repositories/IGuiasRepository';
import { prisma } from '..';
import { Guia } from '@/domain/guias/entities/Guia';
import { logger } from '@/infra/logger';

const log = logger.child('repository:guias');

export class PrismaGuiasRepository implements IGuiasRepository {
  async create(guia: Guia): Promise<void> {
    log.info('Criando guia', { id: guia.id, titulo: guia.props.titulo });

    await prisma.guia.create({
      data: {
        id: guia.id,
        titulo: guia.props.titulo,
        slug: guia.props.slug,
        descricao: guia.props.descricao,
        status: guia.props.status,
        cursoId: guia.props.cursoId,
        tags: guia.props.tags,
        criadoEm: guia.props.criadoEm,
      },
    });
  }

  async findMany(): Promise<Guia[]> {
    log.debug('Listando guias');

    const guias = await prisma.guia.findMany({
      include: {
        curso: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });

    log.info('Guias carregados', { quantidade: guias.length });
    return guias.map(guia =>
      Guia.create(
        {
          titulo: guia.titulo,
          slug: guia.slug,
          descricao: guia.descricao,
          status: guia.status,
          cursoId: guia.cursoId,
          tags: guia.tags,
          criadoEm: guia.criadoEm,
          atualizadoEm: guia.atualizadoEm,
        },
        guia.id
      )
    );
  }

  async findById(id: string): Promise<Guia | null> {
    log.debug('Buscando guia por ID', { id });

    const guia = await prisma.guia.findUnique({
      where: { id },
      include: {
        curso: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    if (!guia) {
      log.warn('Guia não encontrado', { id });
      return null;
    }

    return Guia.create(
      {
        titulo: guia.titulo,
        slug: guia.slug,
        descricao: guia.descricao,
        status: guia.status,
        cursoId: guia.cursoId,
        tags: guia.tags,
        criadoEm: guia.criadoEm,
        atualizadoEm: guia.atualizadoEm,
      },
      guia.id
    );
  }

  async findBySlug(slug: string): Promise<Guia | null> {
    log.debug('Buscando guia por slug', { slug });

    const guia = await prisma.guia.findUnique({
      where: { slug },
      include: {
        curso: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    if (!guia) {
      log.warn('Guia não encontrado pelo slug', { slug });
      return null;
    }

    return Guia.create(
      {
        titulo: guia.titulo,
        slug: guia.slug,
        descricao: guia.descricao,
        status: guia.status,
        cursoId: guia.cursoId,
        tags: guia.tags,
        criadoEm: guia.criadoEm,
        atualizadoEm: guia.atualizadoEm,
      },
      guia.id
    );
  }

  async findByCursoId(cursoId: string): Promise<Guia[]> {
    log.debug('Listando guias por curso', { cursoId });

    const guias = await prisma.guia.findMany({
      where: { cursoId },
      include: {
        curso: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });

    log.info('Guias carregados por curso', { cursoId, quantidade: guias.length });
    return guias.map(guia =>
      Guia.create(
        {
          titulo: guia.titulo,
          slug: guia.slug,
          descricao: guia.descricao,
          status: guia.status,
          cursoId: guia.cursoId,
          tags: guia.tags,
          criadoEm: guia.criadoEm,
          atualizadoEm: guia.atualizadoEm,
        },
        guia.id
      )
    );
  }

  async save(guia: Guia): Promise<void> {
    log.info('Atualizando guia', { id: guia.id });

    await prisma.guia.update({
      where: {
        id: guia.id,
      },
      data: {
        titulo: guia.props.titulo,
        slug: guia.props.slug,
        descricao: guia.props.descricao,
        status: guia.props.status,
        cursoId: guia.props.cursoId,
        tags: guia.props.tags,
      },
    });
  }

  async delete(id: string): Promise<void> {
    log.warn('Removendo guia', { id });

    await prisma.guia.delete({
      where: { id },
    });
  }
}
