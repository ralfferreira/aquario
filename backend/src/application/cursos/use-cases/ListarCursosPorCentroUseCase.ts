import { ICursosRepository } from '@/domain/cursos/repositories/ICursosRepository';
import { Curso } from '@prisma/client';

interface ListarCursosPorCentroUseCaseRequest {
  centroId: string;
}

type ListarCursosPorCentroUseCaseResponse = Curso[];

export class ListarCursosPorCentroUseCase {
  constructor(private cursosRepository: ICursosRepository) {}

  async execute({
    centroId,
  }: ListarCursosPorCentroUseCaseRequest): Promise<ListarCursosPorCentroUseCaseResponse> {
    const cursos = await this.cursosRepository.findByCentroId(centroId);
    return cursos;
  }
}
