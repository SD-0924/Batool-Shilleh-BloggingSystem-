import {Category} from '../models/categoryModel'
import { logError, logInfo } from '../utils/logger'

class CategoryService {
  async createCategory(name: string) {
    try {
      const category = await Category.create({ name })
      logInfo('Category created successfully')
      return category
    } catch (err) {
      logError(err.message)
      throw new Error('Error creating category')
    }
  }
}

export default new CategoryService()
