import userRepository from '../repositories/UserRepository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

class UserService {

  async createUser(data: any) {
    return await userRepository.createUser(data);
  }

  async findUserByEmail(email: string) {
    return await userRepository.findUserByEmail(email);
  }

  async findUserById(id: number) {
    return await userRepository.findUserById(id);
  }

  async validatePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async generateJWT(user: any) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const secret =  process.env.JWT_SECRET || "SDFLJLWEIUR3987REWR398R7WERLKSJDFLKSJF823";
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
  
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  }

  async updateUser(id: number, data: any) {
    return await userRepository.updateUser(id, data);
  }

  async deleteUser(id: number) {
    return await userRepository.deleteUser(id);
  }

  async findAllUsers() {
    return await User.findAll();
  }
}

export default new UserService();
