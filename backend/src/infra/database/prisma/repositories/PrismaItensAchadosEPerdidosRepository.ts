import { ItemAchadoEPerdido } from '@/domain/achados-e-perdidos/entities/ItemAchadoEPerdido';
import { IItensAchadosEPerdidosRepository } from '@/domain/achados-e-perdidos/repositories/IItensAchadosEPerdidosRepository';
import { prisma } from '..';

export class PrismaItensAchadosEPerdidosRepository
  implements IItensAchadosEPerdidosRepository
{
  async create(item: ItemAchadoEPerdido): Promise<void> {
    await prisma.itemAchadoEPerdido.create({
      data: {
        id: item.id,
        titulo: item.props.titulo,
        descricao: item.props.descricao,
        status: item.props.status,
        autorId: item.props.autor.id,
        urlsFotos: item.props.urlsFotos,
        criadoEm: item.props.criadoEm,
        atualizadoEm: item.props.atualizadoEm,
      },
    });
  }

  async findMany(): Promise<ItemAchadoEPerdido[]> {
    const itens = await prisma.itemAchadoEPerdido.findMany({
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
            urlFotoPerfil: true,
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });

    return itens.map((item) =>
      ItemAchadoEPerdido.create(
        {
          titulo: item.titulo,
          descricao: item.descricao,
          status: item.status,
          autor: item.autor,
          urlsFotos: item.urlsFotos,
          criadoEm: item.criadoEm,
          atualizadoEm: item.atualizadoEm,
        },
        item.id,
      ),
    );
  }

  async findById(id: string): Promise<ItemAchadoEPerdido | null> {
    const item = await prisma.itemAchadoEPerdido.findUnique({
      where: { id },
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
            urlFotoPerfil: true,
          },
        },
      },
    });

    if (!item) {
      return null;
    }

    return ItemAchadoEPerdido.create(
      {
        titulo: item.titulo,
        descricao: item.descricao,
        status: item.status,
        autor: item.autor,
        criadoEm: item.criadoEm,
        atualizadoEm: item.atualizadoEm,
      },
      item.id,
    );
  }

  async save(item: ItemAchadoEPerdido): Promise<void> {
    await prisma.itemAchadoEPerdido.update({
      where: {
        id: item.id,
      },
      data: {
        titulo: item.props.titulo,
        descricao: item.props.descricao,
        status: item.props.status,
        atualizadoEm: item.props.atualizadoEm,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.itemAchadoEPerdido.delete({
      where: { id },
    });
  }
}
