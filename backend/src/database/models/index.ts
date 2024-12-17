// src/database/models/index.ts
import { sequelize } from '../config/database';
import Class from './Class';
import Student from './Student';
import User from './User';

Class.initModel(sequelize);
Student.initModel(sequelize);
User.initModel(sequelize);

// Chame as associações após todos os initModels
Class.associate();
Student.associate();
// User não tem associações, então não precisa de chamada no momento

export { sequelize, Class, Student, User };
