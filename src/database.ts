import path from 'path'
import { DataSource } from 'typeorm'
import { DB_FILE } from './config/env'
import { User } from './entities/user.entity'
import { Thing } from './entities/thing.entity'
import { Board } from './entities/board.entity'

const AppDataSource = new DataSource({
  type: 'sqljs',
  autoSave: true,
  location: path.join(__dirname, `../${DB_FILE}`),
  migrations: [],
  subscribers: [],
  entities: [User, Thing, Board],
  synchronize: true,
  logging: false
})

export default AppDataSource
