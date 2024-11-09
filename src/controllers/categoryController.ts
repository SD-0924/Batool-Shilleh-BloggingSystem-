import { Request, Response, NextFunction } from 'express'
import CategoryService from '../services/CategoryService'
import { categoryValidationSchema } from '../validations/categoryValidation'

class CategoryController {
  async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { error } = categoryValidationSchema.validate(req.body)
      if (error) {
        res.status(400).json({ message: error.details[0].message })
        return 
      }
      const { name } = req.body
      const category = await CategoryService.createCategory(name)
      res.status(201).json(category)
    } catch (err) {
      next(err)
    }
  }
}

export default new CategoryController()
