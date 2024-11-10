import { Request, Response } from 'express';
import categoryService from '../services/CategoryService';

class CategoryController {
    async createCategory(req: Request, res: Response) {
        try {
            const newCategory = await categoryService.createCategory(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ message: 'Error creating category', error });
        }
    }

    async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await categoryService.findAllCategories();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching categories', error });
        }
    }

    async getCategoryById(req: Request, res: Response) {
        try {
            const category = await categoryService.findCategoryById(Number(req.params.id));
            if (!category) {
                res.status(404).json({ message: 'Category not found' });
            } else {
                res.json(category);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching category', error });
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const updatedCategory = await categoryService.updateCategory(Number(req.params.id), req.body);
            res.json(updatedCategory);
        } catch (error) {
            res.status(500).json({ message: 'Error updating category', error });
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            await categoryService.deleteCategory(Number(req.params.id));
            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting category', error });
        }
    }
}

export default new CategoryController();
