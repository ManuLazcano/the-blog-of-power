import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../database/config.js'

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const ADMIN = 1

export class UserModel {
  static async getAll ({ isAdmin }) {
    if (!isAdmin) {
      return {
        error: { code: 403, message: 'No permits required' },
        users: null
      }
    }

    const users = await User.findAll()
    return { error: null, users }
  }

  static async getById ({ id, userId, isAdmin }) {
    const userDetail = await User.findByPk(id)

    if (!userDetail) {
      return {
        error: { code: 404, message: 'User does not exist' },
        userDetail: null
      }
    }

    if (userDetail.id !== userId && !isAdmin) {
      return {
        error: { code: 403, message: 'No permits required' },
        userDetail: null
      }
    }

    return { error: null, userDetail }
  }

  static async create ({ input }) {
    const userByEmail = await User.findOne({ where: { email: input.email } })
    if (userByEmail) {
      return {
        error: {
          code: 409,
          message: 'User with this email already exists'
        },
        newUser: null
      }
    }

    const userByNickName = await User.findOne({ where: { nick_name: input.nick_name } })
    if (userByNickName) {
      return {
        error: {
          code: 409,
          message: 'User with this nick_name already exists'
        },
        newUser: null
      }
    }

    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS)
    const newUser = await User.create({
      ...input,
      password: hashedPassword
    }, {
      fields: ['nick_name', 'name', 'email', 'password', 'RolId']
    })

    return { error: null, newUser }
  }

  static async update ({ id, input, userId, isAdmin }) {
    const user = await User.findByPk(id)

    if (!user) {
      return {
        error: { code: 404, message: 'User does not exist' }
      }
    }

    if (user.id !== userId && !isAdmin) {
      return {
        error: { code: 403, message: 'No permits required' }
      }
    }

    if (input.password) {
      input.password = await bcrypt.hash(input.password, SALT_ROUNDS)
    }

    await user.update(input, {
      fields: ['nick_name', 'name', 'email', 'password']
    })

    return { error: null }
  }

  static async delete ({ id, userId, isAdmin }) {
    const user = await User.findByPk(id)

    if (!user) {
      return {
        error: { code: 404, message: 'User does not exist' }
      }
    }

    if (user.id !== userId && !isAdmin) {
      return {
        error: { code: 403, message: 'No permits required' }
      }
    }

    await user.destroy()
    return { error: null }
  }

  static async login ({ input }) {
    const user = await User.findOne({ where: { email: input.email } })
    if (!user) {
      return {
        error: { code: 404, message: 'User does not exist' },
        token: null
      }
    }

    const passwordIsValid = await bcrypt.compare(input.password, user.password)
    if (!passwordIsValid) {
      return {
        error: { code: 401, message: 'Invalid credentials' },
        token: null
      }
    }

    const isAdmin = user.RolId === ADMIN
    const token = jwt.sign(
      { id: user.id, isAdmin },
      process.env.SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      }
    )

    return { error: null, token }
  }
}
