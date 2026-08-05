import path from 'path'
import { DataSource } from 'typeorm'
import { DB_FILE } from '../config/env'
import { User } from '../../modules/users/user.entity'
import { Thing } from '../../modules/things/thing.entity'
import { Board } from '../../modules/boards/board.entity'

const AppDataSource = new DataSource({
  type: 'sqljs',
  autoSave: true,
  location: path.join(__dirname, `../../../${DB_FILE}`),
  migrations: [],
  subscribers: [],
  entities: [User, Thing, Board],
  synchronize: true,
  logging: false
})

export default AppDataSource
