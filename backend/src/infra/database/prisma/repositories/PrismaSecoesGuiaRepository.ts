import { ISecoesGuiaRepository } from '@/domain/guias/repositories/ISecoesGuiaRepository';
import { prisma } from '..';
import { SecaoGuia } from '@/domain/guias/entities/SecaoGuia';
import { logger } from '@/infra/logger';

const log = logger.child('repository:secoes-guia');

export class PrismaSecoesGuiaRepository implements ISecoesGuiaRepository {
  async create(secaoGuia: SecaoGuia): Promise<void> {
    log.info('Criando seção de guia', {
      id: secaoGuia.id,
      guiaId: secaoGuia.props.guiaId,
    });

    await prisma.secaoGuia.create({
      data: {
        id: secaoGuia.id,
        guiaId: secaoGuia.props.guiaId,
        titulo: secaoGuia.props.titulo,
        slug: secaoGuia.props.slug,
        ordem: secaoGuia.props.ordem,
        conteudo: secaoGuia.props.conteudo,
        status: secaoGuia.props.status,
        criadoEm: secaoGuia.props.criadoEm,
      },
    });
  }

  async findMany(): Promise<SecaoGuia[]> {
    log.debug('Listando seções de guia');

    const secoes = await prisma.secaoGuia.findMany({
      orderBy: {
        ordem: 'asc',
      },
    });

    log.info('Seções carregadas', { quantidade: secoes.length });
    return secoes.map(secao =>
      SecaoGuia.create(
        {
          guiaId: secao.guiaId,
          titulo: secao.titulo,
          slug: secao.slug,
          ordem: secao.ordem,
          conteudo: secao.conteudo,
          status: secao.status,
          criadoEm: secao.criadoEm,
          atualizadoEm: secao.atualizadoEm,
        },
        secao.id
      )
    );
  }

  async findByGuiaId(guiaId: string): Promise<SecaoGuia[]> {
    log.debug('Listando seções por guia', { guiaId });

    const secoes = await prisma.secaoGuia.findMany({
      where: { guiaId },
      orderBy: {
        ordem: 'asc',
      },
    });

    log.info('Seções carregadas por guia', { guiaId, quantidade: secoes.length });
    return secoes.map(secao =>
      SecaoGuia.create(
        {
          guiaId: secao.guiaId,
          titulo: secao.titulo,
          slug: secao.slug,
          ordem: secao.ordem,
          conteudo: secao.conteudo,
          status: secao.status,
          criadoEm: secao.criadoEm,
          atualizadoEm: secao.atualizadoEm,
        },
        secao.id
      )
    );
  }

  async findById(id: string): Promise<SecaoGuia | null> {
    log.debug('Buscando seção por ID', { id });

    const secao = await prisma.secaoGuia.findUnique({
      where: { id },
    });

    if (!secao) {
      log.warn('Seção não encontrada', { id });
      return null;
    }

    return SecaoGuia.create(
      {
        guiaId: secao.guiaId,
        titulo: secao.titulo,
        slug: secao.slug,
        ordem: secao.ordem,
        conteudo: secao.conteudo,
        status: secao.status,
        criadoEm: secao.criadoEm,
        atualizadoEm: secao.atualizadoEm,
      },
      secao.id
    );
  }

  async save(secaoGuia: SecaoGuia): Promise<void> {
    log.info('Atualizando seção de guia', { id: secaoGuia.id });

    await prisma.secaoGuia.update({
      where: {
        id: secaoGuia.id,
      },
      data: {
        titulo: secaoGuia.props.titulo,
        slug: secaoGuia.props.slug,
        ordem: secaoGuia.props.ordem,
        conteudo: secaoGuia.props.conteudo,
        status: secaoGuia.props.status,
      },
    });
  }

  async delete(id: string): Promise<void> {
    log.warn('Removendo seção de guia', { id });

    await prisma.secaoGuia.delete({
      where: { id },
    });
  }
}
