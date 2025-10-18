import { Guia } from "@/domain/guias/entities/Guia";
import { IGuiasRepository } from "@/domain/guias/repositories/IGuiasRepository";

interface BuscarGuiaPorSlugUseCaseResponse {
  guia: Guia;
}

export class BuscarGuiaPorSlugUseCase {
  constructor(private guiasRepository: IGuiasRepository) {}

  async execute(slug: string): Promise<BuscarGuiaPorSlugUseCaseResponse> {
    const guia = await this.guiasRepository.findBySlug(slug);

    if (!guia) {
      throw new Error("Guia não encontrada.");
    }

    return { guia };
  }
}
