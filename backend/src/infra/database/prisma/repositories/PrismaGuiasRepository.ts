import { IGuiasRepository } from "@/domain/guias/repositories/IGuiasRepository";
import { prisma } from "..";
import { Guia } from "@/domain/guias/entities/Guia";

export class PrismaGuiasRepository implements IGuiasRepository {
  async create(guia: Guia): Promise<void> {
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
        criadoEm: "desc",
      },
    });

    return guias.map((guia) =>
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
        criadoEm: "desc",
      },
    });

    return guias.map((guia) =>
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
    await prisma.guia.delete({
      where: { id },
    });
  }
}
