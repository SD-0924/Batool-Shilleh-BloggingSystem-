import UserRepository from '../repositories/UserRepository'

class UserService {

    async getAllUsers() {
      return await UserRepository.getAllUsers()
    }
  
    async getUserById(userId: number) {
      return await UserRepository.getUserById(userId)
    }

    async createUser(userData: any) {
      return await UserRepository.createUser(userData)
    }
  
    async updateUser(userId: number, userData: any) {
      return await UserRepository.updateUser(userId, userData)
    }
  
    async deleteUser(userId: number) {
      const user = await UserRepository.getUserById(userId)
      if (user) {
        await UserRepository.deleteUser(userId)
        return true
      }
      return false
    }
  
  }

export default new UserService()