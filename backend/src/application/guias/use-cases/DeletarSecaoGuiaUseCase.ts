import { ISecoesGuiaRepository } from "@/domain/guias/repositories/ISecoesGuiaRepository";

type DeletarSecaoGuiaUseCaseResponse = void;

export class DeletarSecaoGuiaUseCase {
  constructor(private secoesGuiaRepository: ISecoesGuiaRepository) {}

  async execute(id: string): Promise<DeletarSecaoGuiaUseCaseResponse> {
    const secaoGuia = await this.secoesGuiaRepository.findById(id);

    if (!secaoGuia) {
      throw new Error("Seção não encontrada.");
    }

    await this.secoesGuiaRepository.delete(id);
  }
}
