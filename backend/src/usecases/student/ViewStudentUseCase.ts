// src/usecases/student/ViewStudentUseCase.ts
import { IStudentRepository } from '../../domain/repositories/IStudentRepository';
import { StudentAttributes } from '../../database/models/Student';
import  Student from '../../database/models/Student';

export class ViewStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(id: number): Promise<Student | null> {
    return this.studentRepository.findById(id);
  }
}
