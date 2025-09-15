import { IVagasRepository } from '@/domain/vagas/repositories/IVagasRepository';
import { TipoVaga } from '@prisma/client';

interface EditarVagaUseCaseRequest {
  vagaId: string;
  publicadorId: string;
  titulo: string;
  descricao: string;
  tipoVaga: TipoVaga;
  eAtiva: boolean;
}

type EditarVagaUseCaseResponse = void;

export class EditarVagaUseCase {
  constructor(private vagasRepository: IVagasRepository) {}

  async execute({
    vagaId,
    publicadorId,
    titulo,
    descricao,
    tipoVaga,
    eAtiva,
  }: EditarVagaUseCaseRequest): Promise<EditarVagaUseCaseResponse> {
    const vaga = await this.vagasRepository.findById(vagaId);

    if (!vaga) {
      throw new Error('Vaga não encontrada.');
    }

    if (vaga.publicador.id !== publicadorId) {
      throw new Error('Ação não autorizada.');
    }

    vaga.titulo = titulo;
    vaga.descricao = descricao;
    vaga.tipoVaga = tipoVaga;
    vaga.eAtiva = eAtiva;

    await this.vagasRepository.save(vaga);
  }
}
