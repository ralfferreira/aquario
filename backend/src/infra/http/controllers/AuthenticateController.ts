import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthenticateUseCase } from '@/application/usuarios/use-cases/AuthenticateUseCase';
import { PrismaUsuariosRepository } from '@/infra/database/prisma/repositories/PrismaUsuariosRepository';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  senha: z.string(),
});

export class AuthenticateController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, senha } = authenticateBodySchema.parse(request.body);

      const usuariosRepository = new PrismaUsuariosRepository();
      const authenticateUseCase = new AuthenticateUseCase(usuariosRepository);

      const { usuario } = await authenticateUseCase.execute({ email, senha });

      const token = jwt.sign(
        {
          papel: usuario.props.papel,
          permissoes: usuario.props.permissoes,
          papelPlataforma: usuario.props.papelPlataforma,
        },
        env.JWT_SECRET,
        {
          subject: usuario.id,
          expiresIn: '1d',
        }
      );

      return response.status(200).json({ token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ message: 'Validation error.', issues: error.format() });
      }
      if (error instanceof Error) {
        return response.status(401).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal server error.' });
    }
  }
}
