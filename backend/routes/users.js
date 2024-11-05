import { Router } from 'express'

import { authenticateToken } from '../middlewares/authenticateToken.js'
import { UserController } from '../controllers/users.js'

export const userRouter = Router()

userRouter.get('/', authenticateToken, UserController.getAll)

userRouter.get('/:id', authenticateToken, UserController.getById)

userRouter.post('/', UserController.create)

userRouter.patch('/:id', authenticateToken, UserController.update)

userRouter.delete('/:id', authenticateToken, UserController.delete)

userRouter.post('/login', UserController.login)

userRouter.post('/logout', authenticateToken, UserController.logout)
