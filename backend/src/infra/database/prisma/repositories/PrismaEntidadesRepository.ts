import { IEntidadesRepository } from '@/domain/entidades/repositories/IEntidadesRepository';
import { Entidade } from '@/domain/entidades/entities/Entidade';
import { prisma } from '..';

export class PrismaEntidadesRepository implements IEntidadesRepository {
  async findMany(): Promise<Entidade[]> {
    const entidades = await prisma.entidade.findMany({
      orderBy: {
        nome: 'asc',
      },
    });

    return entidades.map((entidade) =>
      Entidade.create(
        {
          nome: entidade.nome,
          descricao: entidade.descricao,
          tipo: entidade.tipo,
          urlFoto: entidade.urlFoto,
          contato: entidade.contato,
          centroId: entidade.centroId,
          criadorId: entidade.criadorId,
        },
        entidade.id,
      ),
    );
  }
}
