import { IsIP } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  name: string

  @Column('uuid')
  userId: string

  @Column({ type: 'varchar', default: '' })
  @IsIP('4')
  origin: string

  @Column({ type: 'simple-array', default: [] })
  thingsIds: string[]

  @CreateDateColumn()
  createdDate: Date
}
