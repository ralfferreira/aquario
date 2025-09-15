import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET as string) as IPayload;

    request.usuario = {
      id: sub,
    };

    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Token inválido.' });
  }
}
