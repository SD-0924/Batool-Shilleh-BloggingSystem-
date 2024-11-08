import request from 'supertest'
import { app, server } from '../server'
import PostService from '../services/PostService'
import sequelize from '../config/db'

jest.mock('../services/PostService')

describe('PostController - createPost', () => {
  afterAll(() => {
    server.close()
    sequelize.close()
  })

  it('should return 400 if validation fails', async () => {
    const invalidPostData = {
      id : 1,
      userId : 1 ,
      content: '',
      title: '',
    }

    const response = await request(app).post('/api/posts/').send(invalidPostData)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('"title" is not allowed to be empty')
  })

  it('should return 201 if post is created successfully', async () => {
    const validPostData = {
      title: 'New Post',
      content: 'This is the content of the new post.',
    }

    const expectedPost = {
      id : 1,
      userId : 1,
      content: 'This is the content of the new post.',
      title: 'New Post',
    };

    (PostService.createPost as jest.Mock).mockResolvedValue({
      id: 1,
      userId : 1,
      content: 'This is the content of the new post.',
      title: 'New Post',
    })

    const response = await request(app).post('/api/posts/').send(validPostData)

    expect(response.status).toBe(201)
    expect(response.body).toEqual(expectedPost)
  })

  it('should return 500 if an error occurs during post creation', async () => {
    const validPostData = {
      title: 'New Post',
      content: 'This is the content of the new post.',
    };

    (PostService.createPost as jest.Mock).mockRejectedValue(new Error('Something went wrong'))

    const response = await request(app).post('/api/posts/').send(validPostData)

    expect(response.status).toBe(500)
    expect(response.body.message).toBe('Internal Server Error')
  })
})
