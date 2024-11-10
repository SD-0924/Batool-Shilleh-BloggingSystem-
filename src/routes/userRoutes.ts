// src/routes/userRoutes.ts
import express from 'express';
import userController from '../controllers/UserController';
import userValidation from '../validations/userValidation';
import { validate } from '../utils/validationUtils';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', userValidation.createUser(), userController.createUser);
router.post('/login', userValidation.loginUser(), userController.loginUser);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.get('/', authMiddleware, userController.getAllUsers);

export default router;
