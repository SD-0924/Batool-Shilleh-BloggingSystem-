
import Joi from 'joi'

export const createUserValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export const updateUserValidation = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(6),
})
