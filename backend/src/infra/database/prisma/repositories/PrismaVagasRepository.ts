import { IVagasRepository } from '@/domain/vagas/repositories/IVagasRepository';
import { Vaga, Publicador } from '@/domain/vagas/entities/Vaga';
import { prisma } from '..';

export class PrismaVagasRepository implements IVagasRepository {
  async findById(id: string): Promise<Vaga | null> {
    const vaga = await prisma.vaga.findUnique({
      where: { id },
      include: { publicador: { select: { id: true, nome: true, email: true } } },
    });

    if (!vaga) {
      return null;
    }

    return Vaga.create(
      {
        titulo: vaga.titulo,
        descricao: vaga.descricao,
        tipoVaga: vaga.tipoVaga,
        publicador: vaga.publicador as Publicador,
        centroId: vaga.centroId,
        eAtiva: vaga.eAtiva,
        criadoEm: vaga.criadoEm,
        atualizadoEm: vaga.atualizadoEm,
      },
      vaga.id
    );
  }

  async save(vaga: Vaga): Promise<void> {
    await prisma.vaga.update({
      where: {
        id: vaga.id,
      },
      data: {
        titulo: vaga.titulo,
        descricao: vaga.descricao,
        tipoVaga: vaga.tipoVaga,
        eAtiva: vaga.eAtiva,
        atualizadoEm: vaga.atualizadoEm,
        publicador: { connect: { id: vaga.publicador.id } },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.vaga.delete({
      where: { id },
    });
  }

  async create(vaga: Vaga): Promise<void> {
    await prisma.vaga.create({
      data: {
        id: vaga.id,
        titulo: vaga.titulo,
        descricao: vaga.descricao,
        tipoVaga: vaga.tipoVaga,
        publicadorId: vaga.publicador.id,
        centroId: vaga.centroId,
        eAtiva: vaga.eAtiva,
      },
    });
  }

  async findMany(): Promise<Vaga[]> {
    const vagas = await prisma.vaga.findMany({
      where: { eAtiva: true },
      include: { publicador: true },
      orderBy: { criadoEm: 'desc' },
    });

    return vagas.map(vaga =>
      Vaga.create(
        {
          titulo: vaga.titulo,
          descricao: vaga.descricao,
          tipoVaga: vaga.tipoVaga,
          publicador: vaga.publicador as any,
          centroId: vaga.centroId,
          eAtiva: vaga.eAtiva,
          criadoEm: vaga.criadoEm,
          atualizadoEm: vaga.atualizadoEm,
        },
        vaga.id
      )
    );
  }
}
