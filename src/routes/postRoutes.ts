import { Router, Request, Response } from 'express'
import PostController from '../controllers/PostController'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  await PostController.getAllPosts(req, res)
})

router.get('/:postId', async (req: Request, res: Response) => {
  await PostController.getPostById(req, res)
})

router.post('/', async (req: Request, res: Response) => {
  await PostController.createPost(req, res)
})

router.put('/:postId', async (req: Request, res: Response) => {
  await PostController.updatePost(req, res)
})

router.delete('/:postId', async (req: Request, res: Response) => {
  await PostController.deletePost(req, res)
})

export default router
