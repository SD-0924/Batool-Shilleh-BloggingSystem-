import { Request, Response } from 'express'
import PostService from '../services/PostService'
import { logError, logInfo } from '../utils/logger'
import {postValidationSchema} from '../validations/postValidation'

class PostController {
  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await PostService.getAllPosts()
      logInfo('Fetched all posts successfully')
      res.status(200).json(posts)
    } catch (err) {
      logError(err.message)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async getPostById(req: Request, res: Response) {
    const postId = Number(req.params.postId)
    try {
      const post = await PostService.getPostById(postId)
      if (post) {
        logInfo(`Fetched post with ID ${postId}`)
        res.status(200).json(post)
      } else {
        logError(`Post with ID ${postId} not found`)
        res.status(404).json({ message: 'Post not found' })
      }
    } catch (err) {
      logError(err.message)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async createPost(req, res) {
    try {
      const { error } = postValidationSchema.validate(req.body)
      if (error) {
        return res.status(400).json({ message: error.details[0].message })
      }
      
      const post = await PostService.createPost(req.body)
      return res.status(201).json(post)
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  

  async updatePost(req: Request, res: Response) {
    const postId = Number(req.params.postId)
    const postData = req.body
    try {
      const updatedPost = await PostService.updatePost(postId, postData)
      if (updatedPost) {
        res.status(200).json(updatedPost)
      } else {
        res.status(404).json({ message: 'Post not found' })
      }
    } catch (err) {
      logError(err.message);
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async deletePost(req: Request, res: Response) {
    const postId = Number(req.params.postId)
    try {
      const deleted = await PostService.deletePost(postId)
      if (deleted) {
        logInfo(`Post with ID ${postId} deleted successfully`)
        res.status(200).json({ message: 'Post deleted' })
      } else {
        logError(`Post with ID ${postId} not found`)
        res.status(404).json({ message: 'Post not found' })
      }
    } catch (err) {
      logError(err.message)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

export default new PostController()
