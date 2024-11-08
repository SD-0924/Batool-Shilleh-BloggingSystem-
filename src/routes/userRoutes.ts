import { Router, Request, Response } from 'express'
import UserController from '../controllers/UserController'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  await UserController.getAllUsers(req, res)
})

router.get('/:userId', async (req: Request, res: Response) => {
  await UserController.getUserById(req, res)
})

router.post('/', async (req: Request, res: Response) => {
  await UserController.createUser(req, res)
})

router.put('/:userId', async (req: Request, res: Response) => {
  await UserController.updateUser(req, res)
})

router.delete('/:userId', async (req: Request, res: Response) => {
  await UserController.deleteUser(req, res)
})

export default router
