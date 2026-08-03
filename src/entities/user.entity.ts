import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import { IsEmail } from 'class-validator'

export const enum UserRole {
  Admin = 'admin',
  Setter = 'setter',
  Viewer = 'viewer'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    enum: UserRole,
    default: UserRole.Viewer
  })
  role: UserRole

  @Column({ type: 'varchar' })
  name: string

  @Column({ unique: true, type: 'varchar' })
  @IsEmail()
  email: string

  @Column({ type: 'varchar' })
  password: string

  @CreateDateColumn()
  createdDate: Date
}
