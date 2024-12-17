import { UserAttributes } from '../../database/models/User';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserAttributes | null>;
}
