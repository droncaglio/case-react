import { Request, Response, NextFunction } from 'express';
import { LoginUseCase } from '../../../usecases/user/LoginUseCase';
import { SequelizeUserRepository } from '../../../infra/db/repositories/SequelizeUserRepository';
import { loginSchema } from '../validators/loginValidator';

export class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validação de entrada usando o schema do Yup
      await loginSchema.validate(req.body, { abortEarly: false });
    } catch (validationError: any) {
      // Coletar todas as mensagens de erro de validação
      const errors = validationError.inner.map((err: any) => err.message);
      
      // Criar um erro personalizado para o middleware de tratamento de erros
      const error: any = new Error(errors.join(', '));
      error.status = 400;
      throw error;
    }

    const { email, password } = req.body;

    const userRepository = new SequelizeUserRepository();
    const loginUseCase = new LoginUseCase(userRepository);

    try {
      const token = await loginUseCase.execute({ email, password });
      res.status(200).json({ data: { token } });
    } catch (error: any) {
      // Reencaminhar o erro para o middleware de tratamento de erros
      next(error);
    }
  };
}
