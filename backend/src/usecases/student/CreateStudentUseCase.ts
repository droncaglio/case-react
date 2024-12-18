// src/usecases/student/CreateStudentUseCase.ts
import { IStudentRepository } from '../../domain/repositories/IStudentRepository';
import Student from '../../database/models/Student';

export interface CreateStudentInput {
  name: string;
  email: string;
  classId: number;
  imagePath?: string | null;
}

export class CreateStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(input: CreateStudentInput): Promise<Student> {
    // Aqui, você pode adicionar lógica adicional de negócio, se necessário

    return this.studentRepository.create(input);
  }
}
