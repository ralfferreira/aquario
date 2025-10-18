import { IGuiasRepository } from "@/domain/guias/repositories/IGuiasRepository";

type DeletarGuiaUseCaseResponse = void;

export class DeletarGuiaUseCase {
  constructor(private guiasRepository: IGuiasRepository) {}

  async execute(id: string): Promise<DeletarGuiaUseCaseResponse> {
    const guia = await this.guiasRepository.findById(id);

    if (!guia) {
      throw new Error("Guia não encontrada.");
    }

    await this.guiasRepository.delete(id);
  }
}
