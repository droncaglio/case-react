// src/interface/http/controllers/ClassController.ts
import { Request, Response, NextFunction } from 'express';
import { ListClassesUseCase } from '../../../usecases/class/ListClassesUseCase';
import { SequelizeClassRepository } from '../../../infra/db/repositories/SequelizeClassRepository';
import { HttpError } from '../errors/HttpError';

export class ClassController {
  /**
   * Método para listar todas as classes.
   * @param req - Objeto de requisição do Express.
   * @param res - Objeto de resposta do Express.
   * @param next - Função para passar erros para o middleware de erros.
   */
  static list = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classRepository = new SequelizeClassRepository();
      const listClassesUseCase = new ListClassesUseCase(classRepository);

      const classes = await listClassesUseCase.execute();
      res.status(200).json({ data: classes });
    } catch (error) {
      // Se o erro for uma instância de HttpError, passamos diretamente.
      if (error instanceof HttpError) {
        next(error);
        return;
      }

      // Caso contrário, passamos o erro genérico.
      next(new HttpError('Failed to list classes', 500));
    }
  };
}
