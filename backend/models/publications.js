import { Publication, User, Federation } from '../database/config.js'

export class PublicationModel {
  static async getAll () {
    const publications = await Publication.findAll()
    return { publications }
  }

  static async getById ({ id }) {
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
      return {
        error: { code: 404, message: 'Publication not found' },
        publicationDetail: null
      }
    }

    return { error: null, publicationDetail }
  }

  static async create ({ input }) {
    const newPublication = await Publication.create(input, {
      fields: ['title', 'content', 'UserId', 'FederationId']
    })

    return { newPublication }
  }

  static async update ({ id, input, userId, isAdmin }) {
    const publication = await Publication.findByPk(id)

    if (!publication) {
      return {
        error: { code: 404, message: 'Publication not found' },
        updatedPublication: null
      }
    }

    if (publication.UserId !== userId && !isAdmin) {
      return {
        error: { code: 403, message: 'No permits required' },
        updatedPublication: null
      }
    }

    await publication.update(input, {
      fields: ['title', 'content', 'FederationId']
    })

    return { error: null, updatedPublication: publication }
  }

  static async delete ({ id, userId, isAdmin }) {
    const publication = await Publication.findByPk(id)

    if (!publication) {
      return {
        error: { code: 404, message: 'Publication not found' }
      }
    }

    if (publication.UserId !== userId && !isAdmin) {
      return {
        error: { code: 403, message: 'No permits required' }
      }
    }

    await publication.destroy()

    return { error: null }
  }
}
