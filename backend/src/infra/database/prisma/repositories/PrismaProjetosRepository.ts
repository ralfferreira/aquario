import { IProjetosRepository } from '@/domain/projetos/repositories/IProjetosRepository';
import { Projeto } from '@/domain/projetos/entities/Projeto';
import { prisma } from '..';

export class PrismaProjetosRepository implements IProjetosRepository {
  async findById(id: string): Promise<Projeto | null> {
    const projeto = await prisma.projeto.findUnique({
      where: { id },
    });

    if (!projeto) {
      return null;
    }

    return Projeto.create(
      {
        titulo: projeto.titulo,
        descricao: projeto.descricao,
        tipo: projeto.tipo,
        criadorId: projeto.criadorId,
        centroId: projeto.centroId,
        tags: projeto.tags,
        url: projeto.url,
        urlFoto: projeto.urlFoto,
        criadoEm: projeto.criadoEm,
        atualizadoEm: projeto.atualizadoEm,
      },
      projeto.id,
    );
  }

  async save(projeto: Projeto): Promise<void> {
    await prisma.projeto.update({
      where: {
        id: projeto.id,
      },
      data: {
        titulo: projeto.titulo,
        descricao: projeto.descricao,
        tags: projeto.tags,
        url: projeto.url,
        urlFoto: projeto.urlFoto,
        atualizadoEm: projeto.props.atualizadoEm,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.projeto.delete({
      where: { id },
    });
  }

  async findMany(): Promise<Projeto[]> {
    const projetos = await prisma.projeto.findMany({
      orderBy: {
        criadoEm: 'desc',
      },
    });

    return projetos.map((projeto) =>
      Projeto.create(
        {
          titulo: projeto.titulo,
          descricao: projeto.descricao,
          tipo: projeto.tipo,
          criadorId: projeto.criadorId,
          centroId: projeto.centroId,
          tags: projeto.tags,
          url: projeto.url,
          urlFoto: projeto.urlFoto,
          criadoEm: projeto.criadoEm,
          atualizadoEm: projeto.atualizadoEm,
        },
        projeto.id,
      ),
    );
  }

  async create(projeto: Projeto): Promise<void> {
    await prisma.projeto.create({
      data: {
        id: projeto.id,
        titulo: projeto.titulo,
        descricao: projeto.descricao,
        criadorId: projeto.criadorId,
        centroId: projeto.centroId,
        tags: projeto.tags,
        tipo: projeto.tipo,
        url: projeto.url,
        urlFoto: projeto.urlFoto,
      },
    });
  }
}