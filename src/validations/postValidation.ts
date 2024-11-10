import { body } from 'express-validator'

class PostValidation {
    createPost() {
        return [
            body('title').isString().withMessage('Title must be a string'),
            body('content').isString().withMessage('Content must be a string'),
        ]
    }

    updatePost() {
        return [
            body('title').optional().isString().withMessage('Title must be a string'),
            body('content').optional().isString().withMessage('Content must be a string'),
        ]
    }
}

export default new PostValidation()
