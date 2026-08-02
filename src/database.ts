import path from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { DB_FILE } from './config/env'

const AppDataSource = new DataSource({
  type: 'sqljs',
  autoSave: true,
  location: path.join(__dirname, `../${DB_FILE}`),
  migrations: [],
  subscribers: [],
  synchronize: true,
  logging: false
})

export default AppDataSource
