// src/interface/http/middlewares/errorHandler.ts
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/HttpError';

/**
 * Middleware de tratamento de erros para Express.
 * Captura erros lançados nas rotas e retorna uma resposta apropriada.
 *
 * @param err - O erro que foi lançado.
 * @param req - Objeto de requisição do Express.
 * @param res - Objeto de resposta do Express.
 * @param next - Função para passar o erro para o próximo middleware.
 */
export const errorHandler = (
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message });
    return;
  }

  if (err.status) {
    res.status(err.status).json({ message: err.message });
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }

  next(err);

  res.status(500).json({ message: err.message, stack: err.stack });
};
