import { ItemAchadoEPerdido } from '@/domain/achados-e-perdidos/entities/ItemAchadoEPerdido';
import { IItensAchadosEPerdidosRepository } from '@/domain/achados-e-perdidos/repositories/IItensAchadosEPerdidosRepository';
import { prisma } from '..';
import { logger } from '@/infra/logger';

const log = logger.child('repository:achados-perdidos');

export class PrismaItensAchadosEPerdidosRepository implements IItensAchadosEPerdidosRepository {
  async create(item: ItemAchadoEPerdido): Promise<void> {
    log.info('Criando item de achados e perdidos', {
      id: item.id,
      autorId: item.props.autor.id,
      status: item.props.status,
    });

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
    log.debug('Listando itens de achados e perdidos');

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

    log.info('Itens carregados', { quantidade: itens.length });
    return itens.map(item =>
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
        item.id
      )
    );
  }

  async findById(id: string): Promise<ItemAchadoEPerdido | null> {
    log.debug('Buscando item por ID', { id });

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
      log.warn('Item não encontrado', { id });
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
      item.id
    );
  }

  async save(item: ItemAchadoEPerdido): Promise<void> {
    log.info('Atualizando item de achados e perdidos', {
      id: item.id,
      status: item.props.status,
    });

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
    log.warn('Removendo item de achados e perdidos', { id });

    await prisma.itemAchadoEPerdido.delete({
      where: { id },
    });
  }
}
