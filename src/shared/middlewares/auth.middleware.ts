import { RequestHandler } from 'express'
import { decodedToken } from '../utils/jwt.util'
import AppDataSource from '../database/database'
import { User, UserRole } from '../../modules/users/user.entity'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        role: UserRole
      }
    }
  }
}

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (typeof authorization !== 'string')
      return res.status(400).json({
        status: 401,
        message: 'Token was not receivd!'
      })

    if (authorization.length < 0)
      return res.status(400).json({
        status: 401,
        message: 'Token was not receivd!'
      })

    const token = authorization.split(' ')[1]
    const decodeToken = await decodedToken(token)

    if (typeof decodeToken.payload === 'string') return
    const data = decodeToken.payload as User

    console.log(data)

    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: data.id })
      .getOne()

    if (user === null)
      return res.status(404).json({
        status: 404,
        message: 'User is not exist'
      })

    req.user = { id: user.id, role: user.role }

    return next()
  } catch (err) {
    console.log(err)
    res.status(500).json()
  }
}
