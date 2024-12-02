import { Router } from 'express'
import { PublicationController } from '../controllers/publications.js'
import { authenticateToken } from '../middlewares/authenticateToken.js'
import { optionalAuthenticateToken } from '../middlewares/optionalAuthenticateToken.js'

export const publicationRouter = Router()

publicationRouter.get('/', PublicationController.getAll)

publicationRouter.get('/:id', optionalAuthenticateToken, PublicationController.getById)

publicationRouter.post('/', authenticateToken, PublicationController.create)

publicationRouter.patch('/:id', authenticateToken, PublicationController.update)

publicationRouter.delete('/:id', authenticateToken, PublicationController.delete)
