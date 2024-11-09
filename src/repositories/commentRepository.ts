import { Comment } from '../models/commentModel'

class CommentRepository {
  async getCommentsByPost(postId: number) {
    return await Comment.findAll({ where: { postId } })
  }

  async createComment(postId: number, userId: number, content: string) {
    return await Comment.create({ postId, userId, content })
  }
}

export default new CommentRepository()