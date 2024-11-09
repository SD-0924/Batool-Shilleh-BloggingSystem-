import { Router } from 'express'
import commentController from '../controllers/commentController'

const commentsRouter = Router()

commentsRouter.get('/posts/:postId/comments', commentController.getCommentsByPost)
commentsRouter.post('/posts/:postId/comments', commentController.createComment)

export default commentsRouter
