import { Router } from 'express'
import { PublicationController } from '../controllers/publications.js'

export const publicationRouter = Router()

publicationRouter.get('/', PublicationController.getAll)

publicationRouter.get('/:id', PublicationController.getById)

publicationRouter.post('/', PublicationController.create)

publicationRouter.patch('/:id', PublicationController.update)

publicationRouter.delete('/:id', PublicationController.delete)
