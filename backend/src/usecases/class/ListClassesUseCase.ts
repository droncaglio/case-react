// src/usecases/class/ListClassesUseCase.ts
import { IClassRepository } from '../../domain/repositories/IClassRepository';
import Class, { ClassAttributes } from '../../database/models/Class';

export class ListClassesUseCase {
  constructor(private classRepository: IClassRepository) {}

  async execute(): Promise<ClassAttributes[]> {
    const classes = await this.classRepository.findAll();
    return classes;
  }
}
