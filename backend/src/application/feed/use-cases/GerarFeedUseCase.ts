import { IProjetosRepository } from '@/domain/projetos/repositories/IProjetosRepository';
import { IVagasRepository } from '@/domain/vagas/repositories/IVagasRepository';
import { IPublicacoesRepository } from '@/domain/publicacoes/repositories/IPublicacoesRepository';

export class GerarFeedUseCase {
  constructor(
    private projetosRepository: IProjetosRepository,
    private vagasRepository: IVagasRepository,
    private publicacoesRepository: IPublicacoesRepository,
  ) {}

  async execute() {
    const [projetos, vagas, publicacoes] = await Promise.all([
      this.projetosRepository.findMany(),
      this.vagasRepository.findMany(),
      this.publicacoesRepository.findMany(),
    ]);

    const feed = [...projetos, ...vagas, ...publicacoes]
      .sort((a, b) => {
        const dateA = a.props.criadoEm || new Date(0);
        const dateB = b.props.criadoEm || new Date(0);
        return dateB.getTime() - dateA.getTime();
      })
      .map((item) => {
        let type = '';
        if (item.constructor.name === 'Projeto') type = 'projeto';
        if (item.constructor.name === 'Vaga') type = 'vaga';
        if (item.constructor.name === 'Publicacao') type = 'publicacao';
        return { type, data: { id: item.id, ...item.props } };
      });

    return { feed };
  }
}
