import os from 'os'
import fs from 'fs'
import path from 'path'
import http from 'http'
import https from 'https'
import app from './app'
import { PORT, HOST, HTTPS } from './shared/config/env'
import AppDataSource from './shared/database/database'
import 'reflect-metadata'
import cluster from 'cluster'

async function initDatabase(retries = 5, delayMs = 3000): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await AppDataSource.initialize()
      console.log('Database: Initialized successfully')
      return
    } catch (error) {
      console.error(
        `Database: Error initializing (Attempt ${attempt}/${retries})`,
        error
      )
      if (attempt === retries) {
        throw new Error('Database: Maximum retry attempts reached.')
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
}

;(async () => {
  if (cluster.isPrimary) {
    console.log(`Primary [${process.pid}] is running`)
    console.log(`Server:  Listen in port ${PORT}`)
    const protocol = String(HTTPS).toLowerCase() === 'true' ? 'https' : 'http'
    const wsProtocol = String(HTTPS).toLowerCase() === 'true' ? 'wss' : 'ws'
    console.log(
      `Server:  Protocol ${protocol.toUpperCase()} ${protocol}://${HOST}:${PORT}`
    )
    console.log(`Server:  WebSocket ${wsProtocol}://${HOST}:${PORT}`)

    const numCPUs = Math.max(1, Math.floor(os.availableParallelism() / 2))
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died. Spawning a new one...`)
      cluster.fork()
    })
  } else {
    try {
      await initDatabase()

      const server =
        String(HTTPS).toLowerCase() === 'true'
          ? https.createServer(
              {
                key: fs.readFileSync(path.join(__dirname, '../ssl/server.key')),
                cert: fs.readFileSync(
                  path.join(__dirname, '../ssl/server.cert')
                )
              },
              app
            )
          : http.createServer(app)

      server.listen({ port: PORT, host: HOST })
    } catch (error) {
      console.error(`Worker ${process.pid} failed to start:`, error)
      process.exit(1)
    }
  }
})()
