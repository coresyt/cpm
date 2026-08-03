import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { createServer } from 'http'
import authRouter from './routes/auth.route'
import usersRouter from './routes/users.route'
import { authMiddleware } from './middlewares/auth.middleware'
import thingsRouter from './routes/thing.route'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors({ origin: '*' }))
app.disable('x-powered-by')

const server = createServer(app)

app.use('/api/auth', authRouter)
app.use('/api/user', authMiddleware, usersRouter)
app.use('/api/things', authMiddleware, thingsRouter)

export default server
