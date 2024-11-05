import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../database/config.js'

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)

export class UserModel {
  static async getAll () {
    const users = await User.findAll()
    return users
  }

  static async getById ({ id }) {
    const userDetail = await User.findByPk(id)
    return userDetail
  }

  static async create ({ input }) {
    const user = await User.findOne({ where: { email: input.email } })
    if (user) {
      return undefined
    }

    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS)
    const newUser = await User.create({
      ...input,
      password: hashedPassword
    }, {
      fields: ['nick_name', 'name', 'email', 'password', 'RolId']
    })

    return newUser
  }

  static async update ({ id, input }) {
    const user = await User.findByPk(id)

    if (!user) {
      return undefined
    }

    if (input.password) {
      input.password = await bcrypt.hash(input.password, SALT_ROUNDS)
    }

    return await user.update(input, {
      fields: ['nick_name', 'name', 'email', 'password']
    })
  }

  static async delete ({ id }) {
    const user = await User.findByPk(id)

    if (!user) {
      return undefined
    }

    return await user.destroy()
  }

  static async login ({ input }) {
    const user = await User.findOne({ where: { email: input.email } })
    if (!user) {
      return { user }
    }

    const passwordIsValid = await bcrypt.compare(input.password, user.password)
    if (!passwordIsValid) {
      return { user, passwordIsValid }
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      }
    )

    return { user, passwordIsValid, token }
  }
}
