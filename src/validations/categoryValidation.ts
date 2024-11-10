import { body } from 'express-validator'

class CategoryValidation {
    createCategory() {
        return [
            body('name').isString().withMessage('Category name must be a string'),
        ]
    }
}

export default new CategoryValidation()