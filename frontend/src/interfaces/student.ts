// src/types/api.ts
import { Class } from './class';	

export interface ListStudentsResponseData {
  message?: string;
  data?: Student[];
  total?: number;
  page?: number;
  totalPages?: number;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  classId: number;
  imagePath: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  class: Class;
  imageUrl: string | null;
}

export interface GetStudentsParams {
  q?: string;
  page?: number;
}

export interface CreateStudentPayload {
  name: string;
  email: string;
  classId: number;
  image?: FileList;
}

export interface UpsertStudentResponse {
  data?: Student;
  message?: string;
}

export interface GroupedPermissions {
  group: string;
  group_identifier: string;
  permissions: {
    name: string;
    label: string;
  }[];
}

export interface NewStudentFormProps {
  classes: Class[];
}

export interface UpdateStudentPayload {
  name: string;
  email: string;
  classId: number;
  image?: FileList;
}

export interface EditStudentFormProps {
  classes: Class[];
  studentData: Student;
  readOnly?: boolean; // Adicionado para controlar se é somente leitura
}

export interface EditStudentPageProps {
  params: {
    id: string;
  };
}

export interface DeleteStudentResponse {
  message?: string;
}
