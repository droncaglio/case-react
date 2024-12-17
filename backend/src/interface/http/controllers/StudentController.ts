// src/interface/http/controllers/StudentController.ts
import { Request, Response, NextFunction } from 'express';
import { ListStudentsUseCase } from '../../../usecases/student/ListStudentsUseCase';
import { CreateStudentUseCase, CreateStudentInput } from '../../../usecases/student/CreateStudentUseCase';
import { EditStudentUseCase, EditStudentInput } from '../../../usecases/student/EditStudentUseCase';
import { ViewStudentUseCase } from '../../../usecases/student/ViewStudentUseCase';
import { DeleteStudentUseCase } from '../../../usecases/student/DeleteStudentUseCase';
import { SequelizeStudentRepository } from '../../../infra/db/repositories/SequelizeStudentRepository';
import { ImageService } from '../../../infra/services/ImageService';
import { editStudentSchema, createStudentSchema } from '../validators/studentValidator';
import { HttpError } from '../errors/HttpError';

export class StudentController {
  static list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { q, page } = req.query;

      const studentRepository = new SequelizeStudentRepository();
      const listStudentsUseCase = new ListStudentsUseCase(studentRepository);

      const result = await listStudentsUseCase.execute({
        query: typeof q === 'string' ? q : undefined,
        page: typeof page === 'string' ? parseInt(page, 10) : undefined,
      });

      // Mapeamento dos alunos para incluir a URL da imagem
      const dataWithImageUrl = result.data.map(student => {
        const studentData = student.toJSON();
        const imageUrl = student.imagePath ? ImageService.getImageUrl(student.imagePath) : null;
        return {
          ...studentData,
          imageUrl,
        };
      });

      res.status(200).json({
        data: dataWithImageUrl,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
      });
    } catch (error) {
      next(error);
    }
  };

  static create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validação de entrada
      await createStudentSchema.validate(req.body, { abortEarly: false });

      const { name, email, classId } = req.body;
      let imagePath: string | null = null;

      if (req.file) {
        imagePath = req.file.filename;
      }

      const studentRepository = new SequelizeStudentRepository();
      const createStudentUseCase = new CreateStudentUseCase(studentRepository);

      const student = await createStudentUseCase.execute({
        name,
        email,
        classId,
        imagePath,
      });

      // Adicionar imageUrl na resposta
      const imageUrl = student.imagePath ? ImageService.getImageUrl(student.imagePath) : null;

      res.status(201).json({ data: { ...student.toJSON(), imageUrl } });
    } catch (error: any) {
      // Tratar erro de duplicidade de email
      if (error.name === 'SequelizeUniqueConstraintError') {
        const uniqueError = new HttpError('Email must be unique', 400);
        return next(uniqueError);
      }

      // Tratar erros de validação do Yup
      if (error.name === 'ValidationError') {
        const errors = error.inner.map((err: any) => err.message);
        const validationError = new HttpError(errors.join(', '), 400);
        return next(validationError);
      }

      next(error);
    }
  };

  static edit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validação de entrada
      await editStudentSchema.validate(req.body, { abortEarly: false });

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        throw new HttpError('Invalid student ID', 400);
      }

      const { name, email, classId } = req.body;
      let imagePath: string | null | undefined = undefined;

      if (req.file) {
        // Buscar o student atual para deletar a imagem antiga, se existir
        const studentRepository = new SequelizeStudentRepository();
        const viewStudentUseCase = new ViewStudentUseCase(studentRepository);
        const existingStudent = await viewStudentUseCase.execute(id);

        if (!existingStudent) {
          throw new HttpError('Student not found', 404);
        }

        if (existingStudent.imagePath) {
          ImageService.deleteImage(existingStudent.imagePath);
        }

        imagePath = req.file.filename;
      }

      const studentRepository = new SequelizeStudentRepository();
      const editStudentUseCase = new EditStudentUseCase(studentRepository);

      const updatedStudent = await editStudentUseCase.execute({
        id,
        name,
        email,
        classId,
        imagePath,
      });

      if (!updatedStudent) {
        throw new HttpError('Student not found', 404);
      }

      // Adicionar imageUrl na resposta
      const imageUrl = updatedStudent.imagePath ? ImageService.getImageUrl(updatedStudent.imagePath) : null;

      res.status(200).json({ data: { ...updatedStudent.toJSON(), imageUrl } });


    } catch (error: any) {
      // Tratar erro de duplicidade de email
      if (error.name === 'SequelizeUniqueConstraintError') {
        const uniqueError = new HttpError('Email must be unique', 400);
        return next(uniqueError);
      }

      // Tratar erros de validação do Yup
      if (error.name === 'ValidationError') {
        const errors = error.inner.map((err: any) => err.message);
        const validationError = new HttpError(errors.join(', '), 400);
        return next(validationError);
      }

      next(error);
    }
  };

  static view = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        throw new HttpError('Invalid student ID', 400);
      }

      const studentRepository = new SequelizeStudentRepository();
      const viewStudentUseCase = new ViewStudentUseCase(studentRepository);

      const student = await viewStudentUseCase.execute(id);

      if (!student) {
        throw new HttpError('Student not found', 404);
      }

      // Adicionar imageUrl na resposta
      const imageUrl = student.imagePath ? ImageService.getImageUrl(student.imagePath) : null;

      res.status(200).json({ data: { ...student.toJSON(), imageUrl } });
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        throw new HttpError('Invalid student ID', 400);
      }

      const studentRepository = new SequelizeStudentRepository();
      const viewStudentUseCase = new ViewStudentUseCase(studentRepository);
      const deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);

      const student = await viewStudentUseCase.execute(id);
      if (!student) {
        throw new HttpError('Student not found', 404);
      }

      if (student.imagePath) {
        ImageService.deleteImage(student.imagePath);
      }

      const success = await deleteStudentUseCase.execute(id);
      if (!success) {
        throw new HttpError('Failed to delete student', 500);
      }

      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}