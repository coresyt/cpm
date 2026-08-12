import fs from 'fs'
import path from 'path'
import server from './app'
import { PORT, HOST } from './shared/config/env'
import AppDataSource from './shared/database/database'
import 'reflect-metadata'

async function handler() {
  try {
    await AppDataSource.initialize()
    console.log('Database: Successfully initialized database')
  } catch (error) {
    console.log(error)
    console.log('Database: Error in initialized database')
    handler()
  }

  console.log(`Server:  Listen in port ${PORT}`)
  console.log(`Server:  HTTP      http://${HOST}:${PORT}`)
  console.log(`Server:  WebSocket ws://${HOST}:${PORT}`)
}

console.clear()

server.listen(
  {
    host: HOST,
    port: PORT,
    key: fs.readFileSync(path.join(__dirname, '../ssl/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '../ssl/server.cert'))
  },
  handler
)
