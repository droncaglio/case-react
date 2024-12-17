// src/domain/repositories/IStudentRepository.ts
import { StudentAttributes } from '../../database/models/Student';
import Student from '../../database/models/Student';

export interface ListStudentsInput {
  query?: string;
  page?: number;
}

export interface ListStudentsOutput {
  data: Student[];
  total: number;
  page: number;
  totalPages: number;
}

export interface IStudentRepository {
  findAll(input: ListStudentsInput): Promise<ListStudentsOutput>;
  findById(id: number): Promise<Student | null>;
  create(student: Omit<StudentAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Student>;
  update(id: number, student: Partial<Omit<StudentAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Student | null>;
  softDelete(id: number): Promise<boolean>;
}
