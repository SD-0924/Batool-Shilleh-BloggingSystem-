import {Comment} from '../models/commentModel'
import { logError, logInfo } from '../utils/logger'

class CommentService {
  async getCommentsByPost(postId: number) {
    try {
      const comments = await Comment.findAll({ where: { postId } })
      logInfo(`Fetched comments for post ID ${postId}`)
      return comments
    } catch (err) {
      logError(err.message)
      throw new Error('Error fetching comments')
    }
  }

  async createComment(postId: number, userId: number, content: string) {
    try {
      const comment = await Comment.create({ postId, userId, content })
      logInfo('Comment created successfully')
      return comment;
    } catch (err) {
      logError(err.message)
      throw new Error('Error creating comment')
    }
  }
}

export default new CommentService()
