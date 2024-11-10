import { Comment } from '../models/Comment';

class CommentRepository {
    async createComment(data: any) {
        return await Comment.create(data);
    }

    async findAllCommentsByPost(postId: number) {
        return await Comment.findAll({ where: { postId } });
    }

    async findCommentById(id: number) {
        return await Comment.findByPk(id);
    }

    async updateComment(id: number, data: any) {
        return await Comment.update(data, { where: { id } });
    }

    async deleteComment(id: number) {
        return await Comment.destroy({ where: { id } });
    }
}

export default new CommentRepository();
