import { Router } from 'express'
import { Federation, Publication, User } from '../database/config.js'

export const publicationRouter = Router()

publicationRouter.get('/', async (req, res) => {
  try {
    const publications = await Publication.findAll()
    res.json(publications)
  } catch (err) {
    console.error('Error: ', err)
    res.status(500).json({ message: 'Error fetching publicacionts' })
  }
})

publicationRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const publicationDetail = await Publication.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'nick_name', 'email']
        },
        { model: Federation }
      ]
    })

    if (!publicationDetail) {
      return res.status(404).json({ message: 'Publication not found' })
    }
    res.json(publicationDetail)
  } catch (err) {
    console.error('Error: ', err)
    res.status(500).json({ error: 'An error occurred while fetching the publication' })
  }
})

publicationRouter.post('/', async (req, res) => {
  const data = req.body // TODO: Validar datos

  try {
    const newPublication = await Publication.create(data, {
      fields: ['title', 'content', 'UserId', 'FederationId']
    })
    res.json({ msg: `Publication created with ID: ${newPublication.id}` })
  } catch (err) {
    console.error('Error: ', err)
    res.status(500).json({ message: 'An error occurred while creating a publication' })
  }
})

publicationRouter.patch('/:id', async (req, res) => {
  const { id } = req.params
  const data = req.body // TODO: validar datos, solo permitir modificar el title, content, federationId

  try {
    const publication = await Publication.findByPk(id)
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' })
    }
    await publication.update(data)

    res.json(publication)
  } catch (err) {
    console.error('Error updating publication:', err)
    res.status(500).json({ message: 'An error occurred while updating the publication' })
  }
})

publicationRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const publication = await Publication.findByPk(id)
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' })
    }

    await publication.destroy()
    res.status(200).json({ message: 'Publication deleted successfully' })
  } catch (err) {
    console.error('Error: ', err)
    res.status(500).json({ message: 'An error occurred while deleting the publication' })
  }
})
