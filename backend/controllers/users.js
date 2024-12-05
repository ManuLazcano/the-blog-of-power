import { UserModel } from '../models/users.js'
import { validateUser, validateParcialUser } from '../schemas/user.js'

export class UserController {
  static async getAll (req, res) {
    const { isAdmin } = req.user

    try {
      const { error, users } = await UserModel.getAll({ isAdmin })
      if (error) {
        const statusCode = error.code
        return res.status(statusCode).json({ message: error.message })
      }

      res.status(200).json(users)
    } catch (err) {
      console.error('Error: ', err)
      res.status(500).json({ message: 'Error fetching users' })
    }
  }

  static async getById (req, res) {
    const { id } = req.params
    const { id: userId, isAdmin } = req.user

    try {
      const { error, userDetail } = await UserModel.getById({ id, userId, isAdmin })

      if (error) {
        const statusCode = error.code
        return res.status(statusCode).json({ message: error.message })
      }
      res.status(200).json(userDetail)
    } catch (err) {
      console.error('Error: ', err)
      res.status(500).json({ message: 'An error occurred while fetching the user' })
    }
  }

  static async create (req, res) {
    const result = validateUser(req.body)

    if (!result.success) {
      return res.status(400).json({
        message: 'Data validation error',
        issues: result.error.errors
      })
    }

    try {
      const input = { ...result.data, RolId: 2 }
      const { error, newUser } = await UserModel.create({ input })

      if (error) {
        const statusCode = error.code
        return res.status(statusCode).json({ message: error.message })
      }
      res.status(201).json({ message: `User created with ID: ${newUser.id}` })
    } catch (err) {
      console.error('Error: ', err)
      res.status(500).json({ message: 'An error occurred while creating a user' })
    }
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validateParcialUser(req.body)
    const { id: userId, isAdmin } = req.user

    if (!result.success) {
      return res.status(400).json({
        message: 'Data validation error',
        issues: result.error.errors
      })
    }

    try {
      const input = result.data
      const { error } = await UserModel.update({ id, input, userId, isAdmin })

      if (error) {
        const statusCode = error.code
        return res.status(statusCode).json({ message: error.message })
      }
      res.status(200).json({ message: `User with ID: ${id} updated successfully` })
    } catch (err) {
      console.error('Error updating user: ', err)
      res.status(500).json({ message: 'An error occured while updating the user' })
    }
  }

  static async delete (req, res) {
    const { id } = req.params
    const { id: userId, isAdmin } = req.user

    if (isAdmin && (userId === id)) {
      return res.status(403).json({ message: 'No puedes eliminar tu propia cuenta de administrador' })
    }

    try {
      const { error } = await UserModel.delete({ id, userId, isAdmin })

      if (error) {
        const statusCode = error.code
        return res.status(statusCode).json({ message: error.message })
      }
      res.status(200).json({ message: 'User deleted successfully' })
    } catch (err) {
      console.error('Error: ', err)
      res.status(500).json({ message: 'An error occurred while deleting the user' })
    }
  }

  static async login (req, res) {
    const result = validateParcialUser(req.body)

    if (!result.success) {
      return res.status(400).json({
        message: 'Data validation error',
        issues: result.error.errors
      })
    }

    try {
      const { error, token, userId, isAdmin } = await UserModel.login({ input: result.data })

      if (error) {
        const statusCode = error.code
        return res.status(statusCode).json({ message: error.message })
      }

      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60
        })
        .status(200).json({ message: 'Valid authentication', userId, isAdmin })
    } catch (err) {
      console.error('Error: ', err)
      res.status(500).json({ message: 'An error occurred while logging in' })
    }
  }

  static async logout (req, res) {
    res
      .clearCookie('access_token')
      .status(200).json({ message: 'Logout successful' })
  }
}
