import commentRepository from '../repositories/commentRepository';

class CommentService {
    async createComment(data: any) {
        return await commentRepository.createComment(data);
    }

    async findAllCommentsByPost(postId: number) {
        return await commentRepository.findAllCommentsByPost(postId);
    }

    async findCommentById(id: number) {
        return await commentRepository.findCommentById(id);
    }

    async updateComment(id: number, data: any) {
        return await commentRepository.updateComment(id, data);
    }

    async deleteComment(id: number) {
        return await commentRepository.deleteComment(id);
    }
}

export default new CommentService();
