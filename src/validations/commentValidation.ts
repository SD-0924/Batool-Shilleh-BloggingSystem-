import { body } from 'express-validator'

class CommentValidation {
    createComment() {
        return [
            body('content').isString().withMessage('Content must be a string'),
        ]
    }
}

export default new CommentValidation()
