import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

export const enum ThingType {
  Output = 'output',
  Input = 'input'
}

@Entity()
export class Thing {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  name: string

  @Column({
    type: 'varchar',
    enum: ThingType,
    default: ThingType.Output
  })
  type: ThingType

  @Column({ type: 'simple-array', default: [] })
  value: any[]

  @Column('uuid')
  userId: string

  @CreateDateColumn()
  createdDate: Date
}
