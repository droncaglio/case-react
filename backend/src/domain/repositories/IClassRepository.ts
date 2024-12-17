// src/domain/repositories/IClassRepository.ts
import { ClassAttributes } from '../../database/models/Class';

export interface IClassRepository {
  findAll(): Promise<ClassAttributes[]>;
}
