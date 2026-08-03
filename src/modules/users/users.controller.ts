import AppDataSource from '../../shared/database/database'
import { User, UserRole } from './user.entity'
import { RequestHandler } from 'express'

export const listUsers: RequestHandler = async (req, res) => {
  try {
    if (req.user === undefined)
      return res.status(404).json({
        status: 404,
        message: 'Not found!'
      })

    console.log(req.user)

    if (req.user.role !== UserRole.Admin)
      return res.status(404).json({ status: 404, message: 'Not found!' })

    const users = await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .where('user.role != :role', { role: UserRole.Admin })
      .getMany()

    res.json({ status: 200, users })
  } catch (err) {
    console.log(err)
    res.status(500).json()
  }
}

export const setRoleUser: RequestHandler = async (req, res) => {
  try {
    if (
      typeof req.body !== 'object' ||
      typeof req.verifyIdentity !== 'boolean' ||
      req.verifyIdentity !== true ||
      typeof req.body.role !== 'string'
    )
      return res.status(400).json({
        status: 400,
        message: "The 'password' and 'role' properties are missing."
      })

    if (typeof req.params.id !== 'string')
      return res.status(404).json({
        status: 404,
        message: 'User is not exist or is incorrect admin password'
      })

    await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ role: req.body.role })
      .where('id = :id', { id: req.params.id })
      .execute()

    res.json({
      status: 200,
      message: `User role successfully updated to the ${req.body.role} role`
    })
  } catch (err) {
    console.log(err)
    res.status(500).json()
  }
}

export const deleteUserById: RequestHandler = async (req, res) => {
  try {
    if (typeof req.params.id !== 'string')
      return res.status(404).json({
        status: 404,
        message: 'User is not exist or is incorrect admin password'
      })

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id: req.params.id })
      .execute()

    res.json({
      status: 200,
      message: 'User successfully deleted'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json()
  }
}
