import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  BelongsToGetAssociationMixin,
} from 'sequelize';
import Class from './Class';

export interface StudentAttributes {
  id: number;
  name: string;
  email: string;
  classId: number;
  imagePath?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

type StudentCreationAttributes = Optional<
  StudentAttributes,
  'id' | 'imagePath' | 'deletedAt'
>;

class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public classId!: number;
  public imagePath?: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  public getClass!: BelongsToGetAssociationMixin<Class>;

  static initModel(sequelize: Sequelize): void {
    Student.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          validate: {
            len: {
              args: [1, 100],
              msg: 'Name must be between 1 and 100 characters.',
            },
          },
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        classId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Classes',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
        },
        imagePath: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: 'Students',
        timestamps: true,
        paranoid: true, // habilita soft delete, usando a coluna deletedAt
      }
    );
  }

  static associate() {
    Student.belongsTo(Class, {
      foreignKey: 'classId',
      as: 'class',
    });
  }
}

export default Student;
