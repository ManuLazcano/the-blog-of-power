import { Router } from 'express'
import bcrypt from 'bcrypt'

import { validateParcialUser } from '../schemas/users'
import { User } from '../database/config'

export const sessionRouter = Router()

sessionRouter.get('/login', async (req, res) => {
  const result = validateParcialUser(req.body)

  if (!result.success) {
    return res.status(400).json({
      message: 'Data validation error',
      issues: result.error.errors
    })
  }

  try {
    const user = await User.findOne({ where: { email: result.data.email } })
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' })
    }

    const passwordIsValid = bcrypt.compare(result.data.password, user.password)
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    console.error('Error: ', err)
    res.status(500).json({ message: 'An error occurred while logging in' })
  }
})

sessionRouter.get('/logout')
