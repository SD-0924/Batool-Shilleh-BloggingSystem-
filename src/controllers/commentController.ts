import { Request, Response, NextFunction } from 'express'
import CommentService from '../services/CommentService'
import { commentValidationSchema } from '../validations/commentValidation'

class CommentController {
  async getCommentsByPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const postId = Number(req.params.postId)
      const comments = await CommentService.getCommentsByPost(postId)
      res.status(200).json(comments)
    } catch (err) {
      next(err)
    }
  }

  async createComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { error } = commentValidationSchema.validate(req.body)
      if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
      }

      const postId = Number(req.params.postId)
      const { userId, content } = req.body
      const comment = await CommentService.createComment(postId, userId, content)
      res.status(201).json(comment)
    } catch (err) {
      next(err)
    }
  }
}

export default new CommentController()
