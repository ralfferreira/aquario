import { IItensAchadosEPerdidosRepository } from '@/domain/achados-e-perdidos/repositories/IItensAchadosEPerdidosRepository';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';
import { StatusItemAchadoEPerdido } from '@prisma/client';

interface AtualizarStatusItemAchadoEPerdidoUseCaseRequest {
  itemId: string;
  usuarioId: string;
  status: StatusItemAchadoEPerdido;
}

type AtualizarStatusItemAchadoEPerdidoUseCaseResponse = void;

const EMAILS_AUTORIZADOS = ['tadea@ci.ufpb.br', 'rivailda@ci.ufpb.br'];

export class AtualizarStatusItemAchadoEPerdidoUseCase {
  constructor(
    private itensRepository: IItensAchadosEPerdidosRepository,
    private usuariosRepository: IUsuariosRepository,
  ) {}

  async execute({
    itemId,
    usuarioId,
    status,
  }: AtualizarStatusItemAchadoEPerdidoUseCaseRequest): Promise<AtualizarStatusItemAchadoEPerdidoUseCaseResponse> {
    const usuario = await this.usuariosRepository.findById(usuarioId);
    if (!usuario || !EMAILS_AUTORIZADOS.includes(usuario.email)) {
      throw new Error('Usuário não autorizado.');
    }

    const item = await this.itensRepository.findById(itemId);
    if (!item) {
      throw new Error('Item não encontrado.');
    }

    item.status = status;

    await this.itensRepository.save(item);
  }
}
