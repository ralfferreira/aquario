import { IVagasRepository } from '@/domain/vagas/repositories/IVagasRepository';
import { Vaga } from '@/domain/vagas/entities/Vaga';
import { prisma } from '..';

export class PrismaVagasRepository implements IVagasRepository {
  async findById(id: string): Promise<Vaga | null> {
    const vaga = await prisma.vaga.findUnique({
      where: { id },
    });

    if (!vaga) {
      return null;
    }

    return Vaga.create(
      {
        titulo: vaga.titulo,
        descricao: vaga.descricao,
        tipoVaga: vaga.tipoVaga,
        publicadorId: vaga.publicadorId,
        centroId: vaga.centroId,
        eAtiva: vaga.eAtiva,
        criadoEm: vaga.criadoEm,
        atualizadoEm: vaga.atualizadoEm,
      },
      vaga.id,
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
        publicadorId: vaga.publicadorId,
        centroId: vaga.centroId,
        eAtiva: vaga.eAtiva,
      },
    });
  }

  async findMany(): Promise<Vaga[]> {
    const vagas = await prisma.vaga.findMany({
      where: {
        eAtiva: true,
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });

    return vagas.map((vaga) =>
      Vaga.create(
        {
          titulo: vaga.titulo,
          descricao: vaga.descricao,
          tipoVaga: vaga.tipoVaga,
          publicadorId: vaga.publicadorId,
          centroId: vaga.centroId,
          eAtiva: vaga.eAtiva,
          criadoEm: vaga.criadoEm,
          atualizadoEm: vaga.atualizadoEm,
        },
        vaga.id,
      ),
    );
  }
}
