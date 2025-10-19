import { IVagasRepository } from '@/domain/vagas/repositories/IVagasRepository';
import { Vaga, Publicador } from '@/domain/vagas/entities/Vaga';
import { prisma } from '..';
import { logger } from '@/infra/logger';

const log = logger.child('repository:vagas');

export class PrismaVagasRepository implements IVagasRepository {
  async findById(id: string): Promise<Vaga | null> {
    log.debug('Buscando vaga por ID', { id });

    const vaga = await prisma.vaga.findUnique({
      where: { id },
      include: { publicador: { select: { id: true, nome: true, email: true } } },
    });

    if (!vaga) {
      log.warn('Vaga não encontrada', { id });
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
    log.info('Atualizando vaga', { id: vaga.id, ativa: vaga.eAtiva });

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
    log.warn('Removendo vaga', { id });

    await prisma.vaga.delete({
      where: { id },
    });
  }

  async create(vaga: Vaga): Promise<void> {
    log.info('Criando vaga', {
      id: vaga.id,
      publicadorId: vaga.publicador.id,
      centroId: vaga.centroId,
    });

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
    log.debug('Listando vagas ativas');

    const vagas = await prisma.vaga.findMany({
      where: { eAtiva: true },
      include: { publicador: true },
      orderBy: { criadoEm: 'desc' },
    });

    log.info('Vagas carregadas', { quantidade: vagas.length });
    return vagas.map(vaga =>
      Vaga.create(
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
      )
    );
  }
}
