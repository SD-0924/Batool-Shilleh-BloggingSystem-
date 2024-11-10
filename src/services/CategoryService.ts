import categoryRepository from '../repositories/categoryRepository';

class CategoryService {
    async createCategory(data: any) {
        return await categoryRepository.createCategory(data);
    }

    async findAllCategories() {
        return await categoryRepository.findAllCategories();
    }

    async findCategoryById(id: number) {
        return await categoryRepository.findCategoryById(id);
    }

    async updateCategory(id: number, data: any) {
        return await categoryRepository.updateCategory(id, data);
    }

    async deleteCategory(id: number) {
        return await categoryRepository.deleteCategory(id);
    }
}

export default new CategoryService();
