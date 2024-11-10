import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import  sequelize  from '../config/db'
import {Post} from './Post';
import {Comment} from './Comment';

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public posts!: Post[];
  public comments!: Comment[];

  static hashPassword(instance: User) {
    if (instance.changed('password')) {
      instance.password = bcrypt.hashSync(instance.password, 10);
    }
  }

  validatePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
    }
  );

  User.beforeCreate(User.hashPassword);
  User.beforeUpdate(User.hashPassword);


export { User };
