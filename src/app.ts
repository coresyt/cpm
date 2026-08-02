import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { createServer } from 'http'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors({ origin: '*' }))
app.disable('x-powered-by')

const server = createServer(app)

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

export default server
