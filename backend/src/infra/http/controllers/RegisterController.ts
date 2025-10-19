import { Request, Response } from 'express';
import { z } from 'zod';
import { RegisterUseCase } from '@/application/usuarios/use-cases/RegisterUseCase';
import { PrismaUsuariosRepository } from '../../database/prisma/repositories/PrismaUsuariosRepository';
import { PrismaCentrosRepository } from '../../database/prisma/repositories/PrismaCentrosRepository';
import { PrismaCursosRepository } from '../../database/prisma/repositories/PrismaCursosRepository';
import { PapelUsuario } from '@prisma/client';

const registerBodySchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres.')
    .max(128, 'A senha deve ter no máximo 128 caracteres.'),
  papel: z.nativeEnum(PapelUsuario),
  centroId: z.string().uuid(),
  bio: z.string().optional(),
  urlFotoPerfil: z.string().url().optional(),
  cursoId: z.string().uuid().optional(),
  periodo: z.number().optional(),
});

export class RegisterController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { nome, email, senha, papel, centroId, bio, urlFotoPerfil, cursoId, periodo } =
        registerBodySchema.parse(request.body);

      const usuariosRepository = new PrismaUsuariosRepository();
      const centrosRepository = new PrismaCentrosRepository();
      const cursosRepository = new PrismaCursosRepository();
      const registerUseCase = new RegisterUseCase(
        usuariosRepository,
        centrosRepository,
        cursosRepository
      );

      await registerUseCase.execute({
        nome,
        email,
        senha,
        papel,
        centroId,
        bio,
        urlFotoPerfil,
        cursoId,
        periodo,
      });

      return response.status(201).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ message: 'Validation error.', issues: error.format() });
      }
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal server error.' });
    }
  }
}
