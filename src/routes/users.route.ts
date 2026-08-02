import { Router } from 'express'
import {
  deleteUserById,
  listUsers,
  setRoleUser
} from '../controllers/users.controller'

const usersRouter = Router()

usersRouter.get('/list', listUsers)

usersRouter.post('/set-role/:id', setRoleUser)

usersRouter.post('/delete/:id', deleteUserById)

export default usersRouter
