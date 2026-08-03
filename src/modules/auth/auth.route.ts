import { Router } from 'express'
import { signIn, signUp, signOut, refreshToken } from './auth.controller'

const authRouter = Router()

authRouter.post('/signin', signIn)

authRouter.post('/signup', signUp)

authRouter.delete('/signout', signOut)

authRouter.post('/refresh-token', refreshToken)

export default authRouter
