import server from './app'
import { PORT } from './config/env'
import AppDataSource from './database'
import 'reflect-metadata'

function exec() {
  server.listen(PORT, async () => {
    try {
      await AppDataSource.initialize()
      console.log('Database: Successfully initialized database')
    } catch (error) {
      console.log(error)
      console.log('Database: Error in initialized database')
      exec()
    }

    console.log('Server:  Listen in port 3000')
    console.log('Server:  HTTP      http://localhost:3000')
    console.log('Server:  WebSocket ws://localhost:3000')
  })
}

console.clear()
exec()
