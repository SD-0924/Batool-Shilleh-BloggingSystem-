import express from 'express'
import commentController from '../controllers/commentController'
import commentValidation from '../validations/commentValidation'
import { validate } from '../utils/validationUtils'
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router();

router.post('/', authMiddleware, commentValidation.createComment(), commentController.createComment);
router.get('/:postId', commentController.getAllCommentsByPost);
router.put('/:id', authMiddleware, commentController.updateComment);
router.delete('/:id', authMiddleware, commentController.deleteComment);

export default router;
