import { ItemAchadoEPerdido } from '@/domain/achados-e-perdidos/entities/ItemAchadoEPerdido';
import { StatusItemAchadoEPerdido } from '@prisma/client';
import { IItensAchadosEPerdidosRepository } from '@/domain/achados-e-perdidos/repositories/IItensAchadosEPerdidosRepository';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';

interface CriarItemAchadoEPerdidoUseCaseRequest {
  titulo: string;
  descricao: string;
  autorId: string;
}

type CriarItemAchadoEPerdidoUseCaseResponse = void;

const EMAILS_AUTORIZADOS = ['tadea@ci.ufpb.br', 'rivailda@ci.ufpb.br'];

export class CriarItemAchadoEPerdidoUseCase {
  constructor(
    private itensRepository: IItensAchadosEPerdidosRepository,
    private usuariosRepository: IUsuariosRepository,
  ) {}

  async execute({
    titulo,
    descricao,
    autorId,
  }: CriarItemAchadoEPerdidoUseCaseRequest): Promise<CriarItemAchadoEPerdidoUseCaseResponse> {
    const autor = await this.usuariosRepository.findById(autorId);

    if (!autor) {
      throw new Error('Autor não encontrado.');
    }

    if (!EMAILS_AUTORIZADOS.includes(autor.email)) {
      throw new Error('Usuário não autorizado a criar um item de achados e perdidos.');
    }

    const item = ItemAchadoEPerdido.create({
      titulo,
      descricao,
      autorId,
      status: StatusItemAchadoEPerdido.PERDIDO,
    });

    await this.itensRepository.create(item);
  }
}
