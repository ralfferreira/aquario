import { IItensAchadosEPerdidosRepository } from '@/domain/achados-e-perdidos/repositories/IItensAchadosEPerdidosRepository';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';

interface DeletarItemAchadoEPerdidoUseCaseRequest {
  itemId: string;
  usuarioId: string;
}

type DeletarItemAchadoEPerdidoUseCaseResponse = void;

export class DeletarItemAchadoEPerdidoUseCase {
  constructor(
    private itensRepository: IItensAchadosEPerdidosRepository,
    private usuariosRepository: IUsuariosRepository
  ) {}

  async execute({
    itemId,
    usuarioId,
  }: DeletarItemAchadoEPerdidoUseCaseRequest): Promise<DeletarItemAchadoEPerdidoUseCaseResponse> {
    const usuario = await this.usuariosRepository.findById(usuarioId);
    if (!usuario || !usuario.props.permissoes.includes('ADMIN')) {
      throw new Error('Usuário não autorizado.');
    }

    const item = await this.itensRepository.findById(itemId);
    if (!item) {
      throw new Error('Item não encontrado.');
    }

    await this.itensRepository.delete(itemId);
  }
}
