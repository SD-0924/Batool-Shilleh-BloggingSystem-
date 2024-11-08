import {User} from '../models/User'

class UserRepository {

    async getAllUsers() {
        return await User.findAll()
    }

    async getUserById(userId: number) {
        return await User.findByPk(userId)
    }

    async createUser(userData: any) {
        return await User.create(userData)
    }

    async updateUser(userId: number, userData: any) {
        const user = await User.findByPk(userId)
        if (user) {
          return await user.update(userData)
        }
        return null
    }

    async deleteUser(userId: number) {
        const user = await User.findByPk(userId)
        if (user) {
          return await user.destroy()
        }
        return null
    }
}
export default new UserRepository()