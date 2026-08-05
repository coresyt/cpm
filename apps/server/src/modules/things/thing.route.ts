import { Router } from 'express'
import {
  createThing,
  deleteThing,
  listThings,
  myListThings,
  updateThing
} from './thing.controller'
import { identityVerificationMiddleware } from '../../shared/middlewares/identity.middleware'

const thingsRouter = Router()

thingsRouter.post('/list', identityVerificationMiddleware, listThings)

thingsRouter.get('/my-list', myListThings)

thingsRouter.post('/create', identityVerificationMiddleware, createThing)

thingsRouter.post('/update/:id', identityVerificationMiddleware, updateThing)

thingsRouter.delete('/delete/:id', identityVerificationMiddleware, deleteThing)

export default thingsRouter
