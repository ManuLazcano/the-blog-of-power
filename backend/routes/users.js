import { Router } from 'express'
import bcrypt from 'bcrypt'

import { User } from '../database/config.js'
import { validateParcialUser, validateUser } from '../schemas/users.js'
import { SALT_ROUNDS } from '../config.js'

export const userRouter = Router()

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (err) {
    console.error('Error: ', err)
    res.status(500).json({ message: 'Error fetching users' })
  }
})

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const userDetail = await User.findByPk(id)
    if (!userDetail) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(userDetail)
  } catch (err) {
    console.error('Error: ', err)
    res.status(500).json({ message: 'An error occurred while fetching the user' })
  }
})

userRouter.post('/', async (req, res) => {
  const result = validateUser(req.body)

  if (!result.success) {
    return res.status(400).json({
      message: 'Data validation error',
      issues: result.error.errors
    })
  }

  try {
    const user = await User.findOne({ where: { email: result.data.email } })
    if (user) {
      return res.status(409).json({ message: 'User alreadys exists' })
    }

    const hashedPassword = await bcrypt.hash(result.data.password, SALT_ROUNDS)
    const newUser = await User.create({
      ...result.data,
      password: hashedPassword
    }, {
      fields: ['nick_name', 'name', 'email', 'password', 'RolId']
    })
    res.status(201).json({ message: `User created with ID: ${newUser.id}` })
  } catch (err) {
    console.error('Error: ', err)
    res.status(500).json({ message: 'An error occurred while creating a user' })
  }
})

userRouter.patch('/:id', async (req, res) => {
  const { id } = req.params
  const result = validateParcialUser(req.body)

  if (!result.success) {
    return res.status(400).json({
      message: 'Data validation error',
      issues: result.error.errors
    })
  }

  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found ' })
    }

    if (result.data.password) {
      result.data.password = await bcrypt.hash(result.data.password, SALT_ROUNDS)
    }

    await user.update(result.data, {
      fields: ['nick_name', 'name', 'email', 'password']
    })
    res.status(200).json({ message: `User with ID: ${id} updated successfully` })
  } catch (err) {
    console.error('Error updating user: ', err)
    res.status(500).json({ message: 'An error occured while updating the user' })
  }
})

userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await user.destroy()
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    console.error('Error: ', err)
    res.status(500).json({ message: 'An error occurred while deleting the user' })
  }
})
