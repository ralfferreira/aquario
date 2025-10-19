import { Request, Response, NextFunction } from 'express';
import { PrismaUsuariosRepository } from '../../database/prisma/repositories/PrismaUsuariosRepository';

export async function ensureAdminOrDocente(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.usuario;

  const usuariosRepository = new PrismaUsuariosRepository();
  const usuario = await usuariosRepository.findById(id);

  if (!usuario) {
    return response.status(404).json({ message: 'Usuário não encontrado.' });
  }

  const isAdmin =
    usuario.props.permissoes.includes('ADMIN') || usuario.props.papelPlataforma === 'MASTER_ADMIN';
  const isDocente = usuario.props.papel === 'DOCENTE';

  if (!isAdmin && !isDocente) {
    return response.status(403).json({ message: 'Ação não autorizada.' });
  }

  return next();
}
