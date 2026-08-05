import { Router } from 'express'
import {
  signIn,
  signUp,
  signOut,
  refreshToken,
  changePassword
} from './auth.controller'
import { authMiddleware } from '../../shared/middlewares/auth.middleware'

const authRouter = Router()

authRouter.post('/signin', signIn)

authRouter.post('/signup', signUp)

authRouter.post('/change-password', authMiddleware, changePassword)

authRouter.delete('/signout', signOut)

authRouter.post('/refresh-token', refreshToken)

export default authRouter
