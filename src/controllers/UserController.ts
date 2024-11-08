import { Request, Response } from 'express'
import UserService from '../services/UserService'
import { createUserValidation } from '../validations/userValidation'
import { logError, logInfo } from '../utils/logger'

class UserController {
  // Fetch all users
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers()
      logInfo('Fetched all users successfully')
      res.status(200).json(users)
    } catch (err) {
      logError(err.message)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  // Fetch a user by ID
  async getUserById(req: Request, res: Response) {
    const userId = Number(req.params.userId)
    try {
      const user = await UserService.getUserById(userId)
      if (user) {
        logInfo(`Fetched user with ID ${userId}`)
        res.status(200).json(user);
      } else {
        logError(`User with ID ${userId} not found`)
        res.status(404).json({ message: 'User not found' })
      }
    } catch (err) {
      logError(err.message)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  // Create a new user
  async createUser(req: Request, res: Response) {
    const { error } = createUserValidation.validate(req.body)
    if (error) {
      logError(error.details[0].message)
      return res.status(400).json({ message: error.details[0].message })
    }

    try {
      const newUser = await UserService.createUser(req.body)
      logInfo(`User with ID ${newUser.id} created successfully`)
      res.status(201).json(newUser)
    } catch (err) {
      logError(err.message)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  // Update user data
  async updateUser(req: Request, res: Response) {
    const userId = Number(req.params.userId)
    const userData = req.body
    try {
      const updatedUser = await UserService.updateUser(userId, userData)
      if (updatedUser) {
        res.status(200).json(updatedUser)
      } else {
        res.status(404).json({ message: 'User not found' })
      }
    } catch (err) {
      logError(err.message)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  // Delete user
  async deleteUser(req: Request, res: Response) {
    const userId = Number(req.params.userId)
    try {
      const deleted = await UserService.deleteUser(userId) 

      if (deleted) {
        logInfo(`User with ID ${userId} deleted successfully`)
        res.status(200).json({ message: 'User deleted' })
      } else {
        logError(`User with ID ${userId} not found`)
        res.status(404).json({ message: 'User not found' })
      }
    } catch (err) {
      logError(err.message)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

export default new UserController()
