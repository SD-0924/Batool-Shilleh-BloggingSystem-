import { Request, Response } from 'express'
import userService from '../services/UserService'
import bcrypt from 'bcryptjs'

class UserController {
     async createUser(req: Request, res: Response) {
          try {
              const { username, email, password } = req.body;
      
              if (!username || !email || !password) {
                   res.status(400).json({ message: 'Please provide all required fields (username, email, password)' });
                   return
              }
      
              const userExists = await userService.findUserByEmail(email);
              if (userExists) {
                   res.status(400).json({ message: 'User already exists' });
                   return
              }
      
              const hashedPassword = bcrypt.hashSync(password, 8);
              const newUser = await userService.createUser({ username, email, password: hashedPassword });
      
               res.status(201).json({ message: 'User created successfully', user: newUser });
               return 
          } catch (error) {
              console.error("Error creating user:", error);  
               res.status(500).json({ message: 'Error creating user', error: error.message });
               return
          }
      }
      
      async loginUser(req: Request, res: Response) {
          try {
              const { email, password } = req.body;
              const user = await userService.findUserByEmail(email);
      
              if (!user) {
                  res.status(404).json({ message: 'User not found' });
                  return;
              }
      
              const validPassword = userService.validatePassword(password, user.password);
      
              if (!validPassword) {
                  res.status(401).json({ message: 'Invalid credentials' });
                  return;
              }
      
              const token = await userService.generateJWT(user);
              res.json({ message: 'Login successful', token });
      
          } catch (error) {
              console.error('Error logging in', error);
              res.status(500).json({ message: 'Error logging in', error });
          }
      }
    
    async getProfile(req: Request, res: Response) {
        try {
            const user = await userService.findUserById(req.user.id)
             res.json(user)
        } catch (error) {
             res.status(500).json({ message: 'Error fetching profile', error })
        }
    }

    async updateProfile(req: Request, res: Response) {
        try {
            const updatedUser = await userService.updateUser(req.user.id, req.body)
             res.json(updatedUser);
        } catch (error) {
             res.status(500).json({ message: 'Error updating profile', error })
        }
    }


 // Get all users
 async getAllUsers(req: Request, res: Response) {
     try {
         const users = await userService.findAllUsers();
          res.json(users);
     } catch (error) {
          res.status(500).json({ message: 'Error fetching users', error });
     }
 }

}

export default new UserController()
