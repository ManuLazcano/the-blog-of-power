import { Router } from 'express'
import { Federation, Publication, User } from '../database/config.js'
import { validateParcialPublication, validatePublication } from '../schemas/publication.js'

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
  const result = validatePublication(req.body)
  if (!result.success) {
    return res.status(400).json({
      message: 'Data validation error',
      issues: result.error.errors
    })
  }

  try {
    const newPublication = await Publication.create(result.data, {
      fields: ['title', 'content', 'UserId', 'FederationId']
    })
    res.status(201).json({ msg: `Publication created with ID: ${newPublication.id}` })
  } catch (err) {
    console.error('Error: ', err)
    res.status(500).json({ message: 'An error occurred while creating a publication' })
  }
})

publicationRouter.patch('/:id', async (req, res) => {
  const { id } = req.params
  const result = validateParcialPublication(req.body)

  if (!result.success) {
    return res.status(400).json({
      message: 'Data validation error',
      issues: result.error.errors
    })
  }

  try {
    const publication = await Publication.findByPk(id)
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' })
    }
    await publication.update(result.data, {
      fields: ['title', 'content', 'FederationId']
    })

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
