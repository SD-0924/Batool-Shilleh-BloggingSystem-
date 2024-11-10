import request from 'supertest';
import {app} from '../server';  
import  userService  from '../services/UserService';  

jest.mock('../services/UserService', () => ({
  findUserByEmail: jest.fn(),
  createUser: jest.fn(),
}));

describe('User Creation API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a new user successfully', async () => {
    (userService.findUserByEmail as jest.Mock).mockResolvedValue(null); 

    const newUser = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(newUser);
  
    expect(response.status).toBe(201);  
    expect(response.body.message).toBe('User created successfully');  
  });
  

  test('should return error if user already exists', async () => {
    (userService.findUserByEmail as jest.Mock).mockResolvedValue({ id: 1, email: 'testuser@example.com' });

    const newUser = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(newUser);
    expect(response.status).toBe(400);  
    expect(response.body.message).toBe('User already exists'); 
  });

  test('should return error if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({});

    expect(response.status).toBe(400);  
    expect(response.body.message).toBe('Please provide all required fields (username, email, password)');  
  });
});
