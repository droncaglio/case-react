import { Model, DataTypes, Optional, Sequelize, Association, HasManyGetAssociationsMixin } from 'sequelize';
import Student from './Student';

export interface ClassAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ClassCreationAttributes extends Optional<ClassAttributes, 'id'> {}

class Class extends Model<ClassAttributes, ClassCreationAttributes> implements ClassAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getStudents!: HasManyGetAssociationsMixin<Student>;

  public static associations: {
    students: Association<Class, Student>;
  };

  static initModel(sequelize: Sequelize): void {
    Class.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'Classes',
      timestamps: true,
    });
  }

  static associate() {
    Class.hasMany(Student, {
      foreignKey: 'classId',
      as: 'students',
    });
  }
}

export default Class;
