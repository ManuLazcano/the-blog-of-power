import bcrypt from 'bcrypt'
import { randomUUID } from 'node:crypto'

import { User, Federation, Publication, Rol } from './config.js'

const isDatabaseEmpty = async () => {
  const rolesCount = await Rol.count()
  const federationsCount = await Federation.count()
  const usersCount = await User.count()
  const publicationsCount = await Publication.count()

  return (rolesCount === 0 || federationsCount === 0 || usersCount === 0 || publicationsCount === 0)
}

const createData = async () => {
  const userOneId = randomUUID()
  const userTwoId = randomUUID()
  const userThreeId = randomUUID()

  return {
    rolesData: [{ rol: 'admin' }, { rol: 'user' }],
    federationsData: [{ federation: 'IPF' }, { federation: 'WRPF' }, { federation: 'IPL' }, { federation: 'AAP' }],
    usersData: [
      {
        id: userOneId,
        nick_name: 'john_doe',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('securepassword123', 10),
        RolId: 2
      },
      {
        id: userTwoId,
        nick_name: 'admin_user',
        name: 'Admin User',
        email: 'admin.user@example.com',
        password: await bcrypt.hash('adminpassword123', 10),
        RolId: 1
      },
      {
        id: userThreeId,
        nick_name: 'jane_smith',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('janeSecure123', 10),
        RolId: 2
      }
    ],
    publicationsData: [
      {
        title: 'My first publication',
        content: 'This is the content of my first publication.',
        UserId: userOneId,
        FederationId: 1
      },
      {
        title: 'Admin announcement',
        content: 'Important announcement for all members.',
        UserId: userTwoId,
        FederationId: 2
      },
      {
        title: 'Jane\'s Update',
        content: 'This is an update from Jane.',
        UserId: userThreeId,
        FederationId: 3
      }
    ]
  }
}

export {
  isDatabaseEmpty,
  createData
}
