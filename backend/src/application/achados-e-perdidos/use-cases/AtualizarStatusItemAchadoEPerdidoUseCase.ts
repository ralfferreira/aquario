import { IItensAchadosEPerdidosRepository } from '@/domain/achados-e-perdidos/repositories/IItensAchadosEPerdidosRepository';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';
import { StatusItemAchadoEPerdido } from '@prisma/client';

interface AtualizarStatusItemAchadoEPerdidoUseCaseRequest {
  itemId: string;
  usuarioId: string;
  titulo?: string;
  descricao?: string;
  status?: StatusItemAchadoEPerdido;
}

type AtualizarStatusItemAchadoEPerdidoUseCaseResponse = void;

export class AtualizarStatusItemAchadoEPerdidoUseCase {
  constructor(
    private itensRepository: IItensAchadosEPerdidosRepository,
    private usuariosRepository: IUsuariosRepository
  ) {}

  async execute({
    itemId,
    usuarioId,
    titulo,
    descricao,
    status,
  }: AtualizarStatusItemAchadoEPerdidoUseCaseRequest): Promise<AtualizarStatusItemAchadoEPerdidoUseCaseResponse> {
    const usuario = await this.usuariosRepository.findById(usuarioId);
    if (!usuario || !usuario.props.permissoes.includes('ADMIN')) {
      throw new Error('Usuário não autorizado.');
    }

    const item = await this.itensRepository.findById(itemId);
    if (!item) {
      throw new Error('Item não encontrado.');
    }

    if (titulo) item.props.titulo = titulo;
    if (descricao) item.props.descricao = descricao;
    if (status) item.status = status;

    await this.itensRepository.save(item);
  }
}
