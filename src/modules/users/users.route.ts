import { Router } from 'express'
import {
  deleteUserById,
  getUserAccount,
  listUsers,
  setRoleUser
} from './users.controller'
import { identityVerificationMiddleware } from '../../shared/middlewares/identity.middleware'

const usersRouter = Router()

usersRouter.get('/list', listUsers)

usersRouter.get('/account', getUserAccount)

usersRouter.post('/set-role/:id', identityVerificationMiddleware, setRoleUser)

usersRouter.post('/delete/:id', identityVerificationMiddleware, deleteUserById)

export default usersRouter
