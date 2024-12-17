// src/usecases/student/ListStudentsUseCase.ts
import {
  IStudentRepository,
  ListStudentsInput,
  ListStudentsOutput,
} from '../../domain/repositories/IStudentRepository';

export class ListStudentsUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(input: ListStudentsInput): Promise<ListStudentsOutput> {
    return this.studentRepository.findAll(input);
  }
}
