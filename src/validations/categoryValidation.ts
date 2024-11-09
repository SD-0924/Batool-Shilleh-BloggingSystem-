import Joi from 'joi'

const categoryValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Category name must be a string',
    'string.empty': 'Category name cannot be empty',
    'string.min': 'Category name must be at least 3 characters long',
    'string.max': 'Category name cannot exceed 50 characters',
    'any.required': 'Category name is required'
  }),
})

export { categoryValidationSchema }