// src/usecases/user/LoginUseCase.ts
import bcrypt from 'bcrypt';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { AuthService } from '../../infra/services/AuthService';

interface LoginInput {
  email: string;
  password: string;
}

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: LoginInput): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      const error = new Error('Invalid email or password') as Error & {
        status?: number;
      };
      error.status = 401;
      throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const error = new Error('Invalid email or password') as Error & {
        status?: number;
      };
      error.status = 401;
      throw error;
    }

    const token = AuthService.generateToken({
      userId: user.id,
      isAdmin: user.isAdmin,
    });

    return token;
  }
}
