// src/routes/postRoutes.ts
import express from 'express';
import postController from '../controllers/PostController';
import postValidation from '../validations/postValidation';
import { validate } from '../utils/validationUtils';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, postValidation.createPost(), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', authMiddleware, postValidation.updatePost(), postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

export default router;
