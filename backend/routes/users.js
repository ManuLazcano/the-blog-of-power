import { Router } from 'express'

export const userRouter = Router()

userRouter.get('/')
userRouter.get('/:id')
userRouter.post('/')
userRouter.patch('/:id')
userRouter.delete('/:id')
