import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class PostCategory extends Model {
  public postId!: number;
  public categoryId!: number;
}

PostCategory.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'post_categories',
    timestamps: false, 
  }
);

export { PostCategory };
