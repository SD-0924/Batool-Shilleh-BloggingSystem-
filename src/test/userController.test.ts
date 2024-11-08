import request from 'supertest'
import  { app, server } from '../server'
import UserService from '../services/UserService'
import sequelize from '../config/db'

jest.mock('../services/UserService')

describe('UserController - createUser', () => {
  let serverInstance

  beforeAll(() => {
    serverInstance = app.listen(7000, () => {
      console.log('Server is running on port 7000')
    })
  })
    afterAll(() => {
        serverInstance.close()
        sequelize.close();
      })
  it('should return 400 if validation fails', async () => {
    const invalidUserData = {
      username: '', 
      email: 'invalidemail', 
    }

    const response = await request(app).post('/api/users/').send(invalidUserData)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('"username" is not allowed to be empty')
  });

  it('should return 201 if user is created successfully', async () => {
    const validUserData = {
      username: 'John Doe',
      email: 'john.doe@example.com',
      password: "P123456j"
    }

    const expectedUser = {
        email: "john.doe@example.com",
        id: 1,
        password: "P123456j",
        username: "John Doe"
      };

    (UserService.createUser as jest.Mock).mockResolvedValue({
      id: 1,
      username: 'John Doe',
      email: 'john.doe@example.com',
      password: "P123456j"
    })

    const response = await request(app).post('/api/users/').send(validUserData)

    expect(response.status).toBe(201)
    expect(response.body).toEqual(expectedUser)

  })

  it('should return 500 if an error occurs during user creation', async () => {
    const validUserData = {
      username: 'John Doe',
      email: 'john.doe@example.com',
      password: "P123456j"
    };

    (UserService.createUser as jest.Mock).mockRejectedValue(new Error('Something went wrong'))

    const response = await request(app).post('/api/users/').send(validUserData)

    expect(response.status).toBe(500)
    expect(response.body.message).toBe('Internal Server Error')
  })
})
