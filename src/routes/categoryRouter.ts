// src/routes/categoryRoutes.ts
import express from 'express';
import categoryController from '../controllers/categoryController';
import categoryValidation from '../validations/categoryValidation';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, categoryValidation.createCategory(), categoryController.createCategory)
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', authMiddleware, categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

export default router;
