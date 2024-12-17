// src/infra/db/repositories/SequelizeClassRepository.ts
import { IClassRepository } from '../../../domain/repositories/IClassRepository';
import Class from '../../../database/models/Class';

export class SequelizeClassRepository implements IClassRepository {
  async findAll(): Promise<Class[]> {
    return Class.findAll({
      order: [['name', 'ASC']],
    });
  }
}
