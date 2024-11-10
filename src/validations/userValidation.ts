import { body } from 'express-validator'

class UserValidation {
    createUser() {
        return [
            body('username').isString().withMessage('Username must be a string'),
            body('email').isEmail().withMessage('Email must be valid'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        ]
    }

    loginUser() {
        return [
            body('email').isEmail().withMessage('Email must be valid'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        ]
    }
}

export default new UserValidation()
