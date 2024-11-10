import { User } from '../models/User';

class UserRepository {
  async createUser(data: any) {
    return await User.create(data);  
  }

  async findUserByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async findUserById(id: number) {
    return await User.findByPk(id);
  }

  async updateUser(id: number, data: any) {
    const user = await User.findByPk(id);
    if (user) {
      return await user.update(data);
    }
    return null;
  }

  async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (user) {
      return await user.destroy();
    }
    return null;
  }
}

export default new UserRepository();
