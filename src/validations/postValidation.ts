import Joi from 'joi'

export const postValidationSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.base': '"title" should be a string',
    'string.min': '"title" should have at least 3 characters',
    'any.required': '"title" is a required field'
  }),
  content: Joi.string().min(5).required().messages({
    'string.base': '"content" should be a string',
    'string.min': '"content" should have at least 5 characters',
    'any.required': '"content" is a required field'
  }),
})

