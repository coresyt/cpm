import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import https from 'https'
import http from 'http'
import authRouter from './modules/auth/auth.route'
import usersRouter from './modules/users/users.route'
import thingsRouter from './modules/things/thing.route'
import { authMiddleware } from './shared/middlewares/auth.middleware'
import boardsRouter from './modules/boards/board.route'
import { HTTPS } from './shared/config/env'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors({ origin: '*' }))
app.disable('x-powered-by')

const server =
  Boolean(HTTPS) === true ? https.createServer(app) : http.createServer(app)

app.use('/api/auth', authRouter)
app.use('/api/user', authMiddleware, usersRouter)
app.use('/api/things', authMiddleware, thingsRouter)
app.use('/api/boards', authMiddleware, boardsRouter)

export default server
