import { Request, Response } from 'express';
import { z } from 'zod';
import { CriarPublicacaoUseCase } from '@/application/publicacoes/use-cases/CriarPublicacaoUseCase';
import { PrismaPublicacoesRepository } from '@/infra/database/prisma/repositories/PrismaPublicacoesRepository';

const criarPublicacaoBodySchema = z.object({
  titulo: z.string(),
  conteudo: z.string(),
  autorId: z.string().cuid(),
  centroId: z.string().cuid(),
});

export class CriarPublicacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { titulo, conteudo, autorId, centroId } = criarPublicacaoBodySchema.parse(request.body);

      const publicacoesRepository = new PrismaPublicacoesRepository();
      const criarPublicacaoUseCase = new CriarPublicacaoUseCase(publicacoesRepository);

      await criarPublicacaoUseCase.execute({
        titulo,
        conteudo,
        autorId,
        centroId,
      });

      return response.status(201).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ 
          message: 'Validation error.', 
          issues: error.format(),
        });
      }
      return response.status(500).json({ message: 'Internal server error.' });
    }
  }
}
