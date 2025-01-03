// src/interface/http/validators/studentValidator.ts
import * as Yup from 'yup';

export const createStudentSchema = Yup.object().shape({
  name: Yup.string()
    .max(100, 'Name must be at most 100 characters')
    .required('Name is required'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  classId: Yup.number()
    .integer('Class ID must be an integer')
    .required('Class ID is required'),
});

export const editStudentSchema = Yup.object().shape({
  name: Yup.string().max(100, 'Name must be at most 100 characters'),

  email: Yup.string().email('Invalid email format'),

  classId: Yup.number().integer('Class ID must be an integer'),
});

export const importCsvSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});
