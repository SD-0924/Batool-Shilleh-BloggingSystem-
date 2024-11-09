import { Router } from 'express'
import categoryController from '../controllers/categoryController'

const categoriesRouter = Router()

categoriesRouter.post('/posts/:postId/categories', categoryController.createCategory)

export default categoriesRouter
