import { Guia } from "@/domain/guias/entities/Guia";
import { IGuiasRepository } from "@/domain/guias/repositories/IGuiasRepository";

interface BuscarGuiaPorIdUseCaseResponse {
  guia: Guia;
}

export class BuscarGuiaPorIdUseCase {
  constructor(private guiasRepository: IGuiasRepository) {}

  async execute(id: string): Promise<BuscarGuiaPorIdUseCaseResponse> {
    const guia = await this.guiasRepository.findById(id);

    if (!guia) {
      throw new Error("Guia não encontrada.");
    }

    return { guia };
  }
}
