import {
  IMembroEntidadeRepository,
  MembroComUsuario,
} from '@/domain/entidades/repositories/IMembroEntidadeRepository';
import { prisma } from '..';

export class PrismaMembroEntidadeRepository implements IMembroEntidadeRepository {
  async findManyByEntidadeId(entidadeId: string): Promise<MembroComUsuario[]> {
    const membros = await prisma.membroEntidade.findMany({
      where: { entidadeId },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            urlFotoPerfil: true,
            papel: true,
            curso: true,
            periodo: true,
          },
        },
      },
    });

    return membros.map(membro => ({
      id: membro.id,
      papel: membro.papel,
      usuario: {
        id: membro.usuario.id,
        nome: membro.usuario.nome,
        urlFotoPerfil: membro.usuario.urlFotoPerfil,
        papel: membro.usuario.papel,
        curso: membro.usuario.curso,
        periodo: membro.usuario.periodo,
      },
    }));
  }
}
