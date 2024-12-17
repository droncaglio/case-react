// src/interface/http/controllers/ClassController.ts
import { Request, Response, NextFunction } from 'express';
import { ListClassesUseCase } from '../../../usecases/class/ListClassesUseCase';
import { SequelizeClassRepository } from '../../../infra/db/repositories/SequelizeClassRepository';

export class ClassController {
  static list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const classRepository = new SequelizeClassRepository();
    const listClassesUseCase = new ListClassesUseCase(classRepository);

    const classes = await listClassesUseCase.execute();
    res.status(200).json({ data: classes });
  };
}
