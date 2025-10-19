import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';

interface IPayload {
  sub: string;
  papelPlataforma?: 'USER' | 'MASTER_ADMIN';
  papel?: string;
  permissoes?: string[];
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  const [scheme, token] = authToken.split(' ');

  if (!token || scheme !== 'Bearer') {
    return response.status(401).json({ message: 'Token de autenticação inválido.' });
  }

  try {
    const { sub, papelPlataforma } = jwt.verify(token, env.JWT_SECRET) as IPayload;

    request.usuario = {
      id: sub,
      papelPlataforma: papelPlataforma ?? 'USER',
    };

    return next();
  } catch {
    return response.status(401).json({ message: 'Token inválido.' });
  }
}
