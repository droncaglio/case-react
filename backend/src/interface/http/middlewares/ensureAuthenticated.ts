// src/interface/http/middlewares/ensureAuthenticated.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../../infra/services/AuthService';
import { HttpError } from '../errors/HttpError';

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  console.log('ensureAuthenticated');

  if (!authHeader) {
    throw new HttpError('Token not provided', 401);
  }

  const [, token] = authHeader.split(' ');
  const decoded = await AuthService.verifyToken(token);

  if (!decoded) {
    throw new HttpError('Invalid token', 401);
  }

  return next();
}
