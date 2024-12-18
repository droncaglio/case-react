import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import User from '../../../database/models/User';

export class SequelizeUserRepository implements IUserRepository {
  async findByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    };
  }
}
