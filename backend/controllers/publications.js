import { PublicationModel } from '../models/publications.js'
import { validatePublication, validateParcialPublication } from '../../shared/schemas/publication.js'

export class PublicationController {
  static async getAll (req, res) {
    try {
      const { publications } = await PublicationModel.getAll()
      res.status(200).json(publications)
    } catch (err) {
      console.error('Error: ', err)
      res.status(500).json({ message: 'Error fetching publicacionts' })
    }
  }

  static async getById (req, res) {
    const { id } = req.params
    const userId = req.user?.id || null
    const isAdmin = req.user?.isAdmin || false

    try {
      const { error, publicationDetail } = await PublicationModel.getById({ id, userId, isAdmin })

      if (error) {
        const statusCode = error.code
        return res.status(statusCode).json({ message: error.message })
      }
      res.status(200).json(publicationDetail)
    } catch (err) {
      console.error('Error: ', err)
      res.status(500).json({ error: 'An error occurred while fetching the publication' })
    }
  }

  static async create (req, res) {
    const { id: UserId } = req.user
    const payload = {
      ...req.body,
      UserId
    }
    const result = validatePublication(payload)

    if (!result.success) {
      return res.status(400).json({
        message: 'Data validation error',
        issues: result.error.errors
      })
    }

    try {
      const { newPublication } = await PublicationModel.create({ input: result.data })
      res.status(201).json({ msg: `Publication created with ID: ${newPublication.id}` })
    } catch (err) {
      console.error('Error: ', err)
      res.status(500).json({ message: 'An error occurred while creating a publication' })
    }
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validateParcialPublication(req.body)
    const { id: userId, isAdmin } = req.user

    if (!result.success) {
      return res.status(400).json({
        message: 'Data validation error',
        issues: result.error.errors
      })
    }

    try {
      const input = result.data
      const { error, updatedPublication } = await PublicationModel.update({ id, input, userId, isAdmin })

      if (error) {
        const statusCode = error.code
        return res.status(statusCode).json({ message: error.message })
      }
      res.status(200).json(updatedPublication)
    } catch (err) {
      console.error('Error updating publication:', err)
      res.status(500).json({ message: 'An error occurred while updating the publication' })
    }
  }

  static async delete (req, res) {
    const { id } = req.params
    const { id: userId, isAdmin } = req.user

    try {
      const { error } = await PublicationModel.delete({ id, userId, isAdmin })

      if (error) {
        const statusCode = error.code
        return res.status(statusCode).json({ message: error.message })
      }
      res.status(200).json({ message: 'Publication deleted successfully' })
    } catch (err) {
      console.error('Error: ', err)
      res.status(500).json({ message: 'An error occurred while deleting the publication' })
    }
  }
}
