import { Request, Response, NextFunction } from 'express';
import { LoginUseCase } from '../../../usecases/user/LoginUseCase';
import { SequelizeUserRepository } from '../../../infra/db/repositories/SequelizeUserRepository';
import { loginSchema } from '../validators/loginValidator';
import * as Yup from 'yup';

export class AuthController {
  static login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Validação de entrada usando o schema do Yup
      await loginSchema.validate(req.body, { abortEarly: false });
    } catch (validationError: unknown) {
      // Coletar todas as mensagens de erro de validação
      if (validationError instanceof Error && 'inner' in validationError) {
        const errors = (validationError as Yup.ValidationError).inner.map(
          (err: Yup.ValidationError) => err.message
        );

        // Criar um erro personalizado para o middleware de tratamento de erros
        const error = new Error(errors.join(', ')) as Error & {
          status?: number;
        };
        error.status = 400;
        throw error;
      }

      // Reencaminhar o erro para o middleware de tratamento de erros
      next(validationError);
    }

    const { email, password } = req.body;

    const userRepository = new SequelizeUserRepository();
    const loginUseCase = new LoginUseCase(userRepository);

    try {
      const token = await loginUseCase.execute({ email, password });
      res.status(200).json({ data: { token } });
    } catch (error: unknown) {
      // Reencaminhar o erro para o middleware de tratamento de erros
      next(error);
    }
  };
}
