// src/usecases/student/DeleteStudentUseCase.ts
import { IStudentRepository } from '../../domain/repositories/IStudentRepository';

export class DeleteStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(id: number): Promise<boolean> {
    return this.studentRepository.softDelete(id);
  }
}
