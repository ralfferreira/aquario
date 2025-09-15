import { ItemAchadoEPerdido } from '@/domain/achados-e-perdidos/entities/ItemAchadoEPerdido';
import { StatusItemAchadoEPerdido } from '@prisma/client';
import { IItensAchadosEPerdidosRepository } from '@/domain/achados-e-perdidos/repositories/IItensAchadosEPerdidosRepository';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';

interface CriarItemAchadoEPerdidoUseCaseRequest {
  titulo: string;
  descricao: string;
  autorId: string;
  urlsFotos?: string[];
}

type CriarItemAchadoEPerdidoUseCaseResponse = void;


export class CriarItemAchadoEPerdidoUseCase {
  constructor(
    private itensRepository: IItensAchadosEPerdidosRepository,
    private usuariosRepository: IUsuariosRepository,
  ) {}

  async execute({
    titulo,
    descricao,
    autorId,
    urlsFotos,
  }: CriarItemAchadoEPerdidoUseCaseRequest): Promise<CriarItemAchadoEPerdidoUseCaseResponse> {
    const autor = await this.usuariosRepository.findById(autorId);

    if (!autor) {
      throw new Error('Autor não encontrado.');
    }

    if (!autor.props.permissoes.includes('ADMIN')) {
      throw new Error('Usuário não autorizado a criar um item de achados e perdidos.');
    }

    const item = ItemAchadoEPerdido.create({
      titulo,
      descricao,
      status: StatusItemAchadoEPerdido.PERDIDO,
      autor: {
        id: autor.id,
        nome: autor.props.nome,
        urlFotoPerfil: autor.props.urlFotoPerfil,
      },
      urlsFotos,
    });

    await this.itensRepository.create(item);
  }
}
