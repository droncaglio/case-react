// src/usecases/student/EditStudentUseCase.ts
import { IStudentRepository } from '../../domain/repositories/IStudentRepository';
import Student from '../../database/models/Student';

export interface EditStudentInput {
  id: number;
  name?: string;
  email?: string;
  classId?: number;
  imagePath?: string | null;
}

export class EditStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(input: EditStudentInput): Promise<Student | null> {
    return this.studentRepository.update(input.id, {
      name: input.name,
      email: input.email,
      classId: input.classId,
      imagePath: input.imagePath,
    });
  }
}
