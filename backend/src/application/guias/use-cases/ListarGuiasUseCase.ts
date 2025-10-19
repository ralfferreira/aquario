import { Guia } from '@/domain/guias/entities/Guia';
import { IGuiasRepository } from '@/domain/guias/repositories/IGuiasRepository';

interface ListarGuiasUseCaseRequest {
  cursoId?: string;
}

interface ListarGuiasUseCaseResponse {
  guias: Guia[];
}

export class ListarGuiasUseCase {
  constructor(private guiasRepository: IGuiasRepository) {}

  async execute({ cursoId }: ListarGuiasUseCaseRequest = {}): Promise<ListarGuiasUseCaseResponse> {
    let guias: Guia[];

    if (cursoId) {
      guias = await this.guiasRepository.findByCursoId(cursoId);
    } else {
      guias = await this.guiasRepository.findMany();
    }

    return { guias };
  }
}
