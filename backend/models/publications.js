import { Publication, User, Federation } from '../database/config.js'

export class PublicationModel {
  static async getAll () {
    const publications = await Publication.findAll()
    return publications
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

    return publicationDetail
  }

  static async create ({ input }) {
    const newPublicacion = await Publication.create(input, {
      fields: ['title', 'content', 'UserId', 'FederationId']
    })

    return newPublicacion
  }

  static async update ({ id, input }) {
    const publication = await Publication.findByPk(id)

    if (!publication) {
      return undefined
    }

    await publication.update(input, {
      fields: ['title', 'content', 'FederationId']
    })

    return publication
  }

  static async delete ({ id }) {
    const publication = await Publication.findByPk(id)

    if (!publication) {
      return undefined
    }

    return await publication.destroy()
  }
}
