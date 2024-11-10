import { Category } from '../models/Category';

class CategoryRepository {
    async createCategory(data: any) {
        return await Category.create(data);
    }

    async findAllCategories() {
        return await Category.findAll();
    }

    async findCategoryById(id: number) {
        return await Category.findByPk(id);
    }

    async updateCategory(id: number, data: any) {
        return await Category.update(data, { where: { id } });
    }

    async deleteCategory(id: number) {
        return await Category.destroy({ where: { id } });
    }
}

export default new CategoryRepository();
