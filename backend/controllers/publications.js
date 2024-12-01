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

    try {
      const { error, publicationDetail } = await PublicationModel.getById({ id })

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
    const result = validatePublication(req.body)

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

    if (!result.success) {
      return res.status(400).json({
        message: 'Data validation error',
        issues: result.error.errors
      })
    }

    try {
      const { error, updatedPublication } = await PublicationModel.update({ id, input: result.data })

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
    const userId = req.user.id

    try {
      const { error } = await PublicationModel.delete({ id, userId })

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
