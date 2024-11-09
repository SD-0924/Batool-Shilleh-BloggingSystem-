import Joi from 'joi'

const commentValidationSchema = Joi.object({
  content: Joi.string().min(1).max(500).required().messages({
    'string.base': 'Comment content must be a string',
    'string.empty': 'Comment content cannot be empty',
    'string.min': 'Comment content must be at least 1 character long',
    'string.max': 'Comment content cannot exceed 500 characters',
    'any.required': 'Comment content is required'
  }),
})

export { commentValidationSchema }
