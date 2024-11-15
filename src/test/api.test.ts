import userService from '../services/UserService';
import userRepository from '../repositories/UserRepository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

// Mocking dependencies
jest.mock('../repositories/UserRepository');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = { username: 'testuser', email: 'testuser@example.com', password: 'password123' };
      (userRepository.createUser as jest.Mock).mockResolvedValue(userData);

      const result = await userService.createUser(userData);

      expect(userRepository.createUser).toHaveBeenCalledWith(userData);
      expect(result).toEqual(userData);
    });
  });

  describe('findUserByEmail', () => {
    it('should find a user by email', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'testuser@example.com' };
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.findUserByEmail('testuser@example.com');

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith('testuser@example.com');
      expect(result).toEqual(mockUser);
    });
  });

  describe('findUserById', () => {
    it('should find a user by ID', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'testuser@example.com' };
      (userRepository.findUserById as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.findUserById(1);

      expect(userRepository.findUserById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('generateJWT', () => {
    it('should generate a valid JWT', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'testuser@example.com' };
      const mockToken = 'mockedToken';
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const result = await userService.generateJWT(mockUser);

      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser.id, username: mockUser.username, email: mockUser.email },
        "SDFLJLWEIUR3987REWR398R7WERLKSJDFLKSJF823",
        { expiresIn: '1h' }
      );
      expect(result).toBe(mockToken);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updatedData = { username: 'updateduser' };
      (userRepository.updateUser as jest.Mock).mockResolvedValue(updatedData);

      const result = await userService.updateUser(1, updatedData);

      expect(userRepository.updateUser).toHaveBeenCalledWith(1, updatedData);
      expect(result).toEqual(updatedData);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      (userRepository.deleteUser as jest.Mock).mockResolvedValue(true);

      const result = await userService.deleteUser(1);

      expect(userRepository.deleteUser).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: 1, username: 'user1', email: 'user1@example.com' },
        { id: 2, username: 'user2', email: 'user2@example.com' },
      ];
      jest.spyOn(User, 'findAll').mockResolvedValue(mockUsers as any);

      const result = await userService.findAllUsers();

      expect(User.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });
});
describe('UserService - generateJWT', () => {
  it('should generate a token when secret is set', async () => {
    (jwt.sign as jest.Mock).mockReturnValue('mockedToken');

    const mockUser = { id: 1, username: 'testuser', email: 'testuser@example.com' };
    const token = await userService.generateJWT(mockUser);

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 1, username: 'testuser', email: 'testuser@example.com' },
      "SDFLJLWEIUR3987REWR398R7WERLKSJDFLKSJF823", // تأكد أن المفتاح الافتراضي مستخدم
      { expiresIn: '1h' }
    );
    expect(token).toBe('mockedToken');
  });
});