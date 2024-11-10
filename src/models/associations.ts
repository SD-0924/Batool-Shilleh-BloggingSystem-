import { Post } from './Post';
import { Comment } from './Comment';
import { User } from './User';;
import { Category } from './Category';
import { PostCategory } from './postCategory';

Post.belongsToMany(Category, { through: PostCategory, foreignKey: 'postId' });
Category.belongsToMany(Post, { through: PostCategory, foreignKey: 'categoryId' });

export const setupAssociations = () => {
};

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
