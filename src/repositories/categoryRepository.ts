import { Category } from '../models/categoryModel'

class CategoryRepository {
  async getAllCategories() {
    return await Category.findAll()
  }

  async createCategory(name: string) {
    return await Category.create({ name })
  }
}

export default new CategoryRepository()