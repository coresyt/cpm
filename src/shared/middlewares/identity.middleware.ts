import { RequestHandler } from 'express'
import AppDataSource from '../database/database'
import { User } from '../../modules/users/user.entity'
import { comparePassword } from '../utils/hash.util'

declare global {
  namespace Express {
    interface Request {
      verifyIdentity?: boolean
    }
  }
}

export const identityVerificationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    if (req.user === undefined || typeof req.body.password !== 'string')
      return res.status(404).json({
        status: 404,
        message: 'Not found!'
      })

    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: req.user.id })
      .getOne()

    if (user === null)
      return res.status(404).json({
        status: 404,
        message: 'User is not exist'
      })

    const isCorrectPassword = await comparePassword(
      user.password,
      req.body.password
    )

    if (!isCorrectPassword)
      return res.status(404).json({
        status: 404,
        message: 'User is not exist or is incorrect admin password'
      })

    req.verifyIdentity = true
    return next()
  } catch (err) {
    console.log(err)
    res.status(500).json()
  }
}
