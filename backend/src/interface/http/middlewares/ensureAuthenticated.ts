// src/interface/http/middlewares/ensureAuthenticated.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../../infra/services/AuthService';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    const error: any = new Error('Token not provided');
    error.status = 401;
    throw error;
  }

  const [, token] = authHeader.split(' ');
  const decoded = AuthService.verifyToken(token);

  if (!decoded) {
    const error: any = new Error('Invalid token');
    error.status = 401;
    throw error;
  }

  // Adicionar informações decodificadas ao request (se necessário)
  (req as any).user = decoded;

  return next();
}
