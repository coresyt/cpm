import { Router } from 'express'
import { identityVerificationMiddleware } from '../../shared/middlewares/identity.middleware'
import {
  addThingsToBoard,
  createBoard,
  deleteBoard,
  listBoards,
  myListBoards,
  setIp,
  updateBoard
} from './board.controller'

const boardsRouter = Router()

boardsRouter.post('/list', identityVerificationMiddleware, listBoards)

boardsRouter.get('/my-list', myListBoards)

boardsRouter.post('/create', identityVerificationMiddleware, createBoard)

boardsRouter.post('/update/:id', identityVerificationMiddleware, updateBoard)

boardsRouter.post(
  '/add-things/:id',
  identityVerificationMiddleware,
  addThingsToBoard
)

boardsRouter.post('/set-ip/:id', identityVerificationMiddleware, setIp)

boardsRouter.delete('/delete/:id', identityVerificationMiddleware, deleteBoard)

export default boardsRouter
