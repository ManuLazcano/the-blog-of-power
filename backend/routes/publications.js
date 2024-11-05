import { Router } from 'express'
import { PublicationController } from '../controllers/publications.js'
import { authenticateToken } from '../middlewares/authenticateToken.js'

export const publicationRouter = Router()

publicationRouter.get('/', PublicationController.getAll)

publicationRouter.get('/:id', PublicationController.getById)

publicationRouter.post('/', authenticateToken, PublicationController.create)

publicationRouter.patch('/:id', authenticateToken, PublicationController.update)

publicationRouter.delete('/:id', authenticateToken, PublicationController.delete)
