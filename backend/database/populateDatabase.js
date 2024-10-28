import { isDatabaseEmpty, createData } from './utils.js'
import { User, Federation, Publication, Rol } from './config.js'

export async function populateDatabase () {
  try {
    if (!await isDatabaseEmpty()) {
      console.log('La base de datos ya tiene datos. No se necesitan datos adicionales.')
      return
    }

    const {
      rolesData,
      federationsData,
      usersData,
      publicationsData
    } = await createData()

    await Rol.bulkCreate(rolesData, { validate: true })
    await Federation.bulkCreate(federationsData, { validate: true })
    await User.bulkCreate(usersData, { validate: true })
    await Publication.bulkCreate(publicationsData, { validate: true })

    console.log('Database populated successfully!')
  } catch (error) {
    console.error('Error populating the database:', error)
  }
}
