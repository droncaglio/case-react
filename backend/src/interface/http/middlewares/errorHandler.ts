import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
  status?: number;
}

export function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
  console.error(err); // Log do erro para debug

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ message });
}
