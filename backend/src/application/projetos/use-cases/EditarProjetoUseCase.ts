import { IProjetosRepository } from '@/domain/projetos/repositories/IProjetosRepository';

interface EditarProjetoUseCaseRequest {
  projetoId: string;
  criadorId: string;
  titulo: string;
  descricao: string;
  tags: string[];
  url?: string;
  urlFoto?: string;
}

type EditarProjetoUseCaseResponse = void;

export class EditarProjetoUseCase {
  constructor(private projetosRepository: IProjetosRepository) {}

  async execute({
    projetoId,
    criadorId,
    titulo,
    descricao,
    tags,
    url,
    urlFoto,
  }: EditarProjetoUseCaseRequest): Promise<EditarProjetoUseCaseResponse> {
    const projeto = await this.projetosRepository.findById(projetoId);

    if (!projeto) {
      throw new Error('Projeto não encontrado.');
    }

    if (projeto.criadorId !== criadorId) {
      throw new Error('Ação não autorizada.');
    }

    projeto.titulo = titulo;
    projeto.descricao = descricao;
    projeto.tags = tags;
    projeto.url = url;
    projeto.urlFoto = urlFoto;

    await this.projetosRepository.save(projeto);
  }
}
