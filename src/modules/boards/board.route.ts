import { Router } from 'express'
import { identityVerificationMiddleware } from '../../shared/middlewares/identity.middleware'
import {
  createBoard,
  deleteBoard,
  listBoards,
  myListBoards,
  updateBoard
} from './board.controller'

const boardsRouter = Router()

boardsRouter.post('/list', identityVerificationMiddleware, listBoards)

boardsRouter.get('/my-list', myListBoards)

boardsRouter.post('/create', identityVerificationMiddleware, createBoard)

boardsRouter.post('/update/:id', identityVerificationMiddleware, updateBoard)

boardsRouter.delete('/delete/:id', identityVerificationMiddleware, deleteBoard)

export default boardsRouter
