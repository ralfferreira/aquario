import { Vaga } from '@/domain/vagas/entities/Vaga';
import { IVagasRepository } from '@/domain/vagas/repositories/IVagasRepository';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';
import { ICentrosRepository } from '@/domain/centros/repositories/ICentrosRepository';
import { TipoVaga } from '@prisma/client';

interface CriarVagaUseCaseRequest {
  titulo: string;
  descricao: string;
  tipoVaga: TipoVaga;
  publicadorId: string;
  centroId: string;
}

type CriarVagaUseCaseResponse = void;

export class CriarVagaUseCase {
  constructor(
    private vagasRepository: IVagasRepository,
    private usuariosRepository: IUsuariosRepository,
    private centrosRepository: ICentrosRepository,
  ) {}

  async execute({
    titulo,
    descricao,
    tipoVaga,
    publicadorId,
    centroId,
  }: CriarVagaUseCaseRequest): Promise<CriarVagaUseCaseResponse> {
    const publicador = await this.usuariosRepository.findById(publicadorId);
    if (!publicador) {
      throw new Error('Publicador não encontrado.');
    }
    const centro = await this.centrosRepository.findById(centroId);
    if (!centro) {
      throw new Error('Centro não encontrado.');
    }

    const vaga = Vaga.create({
      titulo,
      descricao,
      tipoVaga,
      publicador: {
        id: publicador.id,
        nome: publicador.props.nome,
        urlFotoPerfil: publicador.props.urlFotoPerfil,
      },
      centroId,
    });

    await this.vagasRepository.create(vaga);
  }
}
