import { ISubSecoesGuiaRepository } from "@/domain/guias/repositories/ISubSecoesGuiaRepository";

type DeletarSubSecaoGuiaUseCaseResponse = void;

export class DeletarSubSecaoGuiaUseCase {
  constructor(private subSecoesGuiaRepository: ISubSecoesGuiaRepository) {}

  async execute(id: string): Promise<DeletarSubSecaoGuiaUseCaseResponse> {
    const subSecaoGuia = await this.subSecoesGuiaRepository.findById(id);

    if (!subSecaoGuia) {
      throw new Error("Subseção não encontrada.");
    }

    await this.subSecoesGuiaRepository.delete(id);
  }
}
