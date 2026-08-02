import path from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
  type: 'sqljs',
  autoSave: true,
  location: path.join(__dirname, '../db'),
  migrations: [],
  subscribers: [],
  synchronize: true,
  logging: false
})

export default AppDataSource
