// src/infra/db/repositories/SequelizeStudentRepository.ts
import {
  IStudentRepository,
  ListStudentsInput,
  ListStudentsOutput,
} from '../../../domain/repositories/IStudentRepository';
import Student, { StudentAttributes } from '../../../database/models/Student';
import Class from '../../../database/models/Class';
import { Op } from 'sequelize';

export class SequelizeStudentRepository implements IStudentRepository {
  async findAll(input: ListStudentsInput): Promise<ListStudentsOutput> {
    const { query = '', page = 1 } = input;
    const limit = 10;
    const offset = (page - 1) * limit;

    const whereCondition: { name?: { [Op.iLike]: string } } = {};
    if (query) {
      whereCondition.name = { [Op.iLike]: `%${query}%` };
    }

    const { rows, count } = await Student.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Class,
          as: 'class',
          attributes: ['id', 'name'],
        },
      ],
      order: [['name', 'ASC']],
      limit,
      offset,
      paranoid: true, // Excluir soft-deleted
    });

    const totalPages = Math.ceil(count / limit);

    return {
      data: rows,
      total: count,
      page,
      totalPages,
    };
  }

  async findById(id: number): Promise<Student | null> {
    return Student.findByPk(id, {
      include: [
        {
          model: Class,
          as: 'class',
          attributes: ['id', 'name'],
        },
      ],
      paranoid: true,
    });
  }

  async create(
    student: Omit<
      StudentAttributes,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >
  ): Promise<Student> {
    return Student.create(student);
  }

  async update(
    id: number,
    student: Partial<
      Omit<StudentAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >
  ): Promise<Student | null> {
    const existingStudent = await Student.findByPk(id);
    if (!existingStudent) {
      return null;
    }
    await existingStudent.update(student);
    return existingStudent;
  }

  async softDelete(id: number): Promise<boolean> {
    const student = await Student.findByPk(id);
    if (!student) {
      return false;
    }
    await student.destroy(); // Soft delete
    return true;
  }
}
