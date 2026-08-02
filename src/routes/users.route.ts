import { Router } from 'express'
import {
  deleteUserById,
  listUsers,
  setRoleUser
} from '../controllers/users.controller'
import { identityVerificationMiddleware } from '../middlewares/identity.middleware'

const usersRouter = Router()

usersRouter.get('/list', listUsers)

usersRouter.post('/set-role/:id', identityVerificationMiddleware, setRoleUser)

usersRouter.post('/delete/:id', identityVerificationMiddleware, deleteUserById)

export default usersRouter
