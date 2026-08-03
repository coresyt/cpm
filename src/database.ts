import path from 'path'
import { DataSource } from 'typeorm'
import { DB_FILE } from './config/env'
import { User } from './entities/user.entity'
import { Thing } from './entities/thing.entity'

const AppDataSource = new DataSource({
  type: 'sqljs',
  autoSave: true,
  location: path.join(__dirname, `../${DB_FILE}`),
  migrations: [],
  subscribers: [],
  entities: [User, Thing],
  synchronize: true,
  logging: false
})

export default AppDataSource
