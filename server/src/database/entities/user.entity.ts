import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Admins } from './admin.entity';
import { Students } from './student.entity';
import { Instructors } from './instructor.entity';
import { Messages } from './message.entity';
import { Ratings } from './rate.entity';
import { Payments } from './payment.entity';
import { Clients } from './client.entity';

@Table
export class Users extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  user_id: bigint;

  @Column(DataType.STRING)
  user_name: string;

  @Column({ type: DataType.STRING, unique: true })
  user_email: string;

  @Column(DataType.STRING)
  password: string;

  @Column({ type: DataType.STRING, unique: true })
  phone_number: string;

  @Column(DataType.BIGINT)
  role: bigint;

  @Column({ type: DataType.TEXT, defaultValue: null })
  user_img: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_deleted: boolean;

  @Column({ type: DataType.STRING, defaultValue: null })
  google_id: string;

  @HasOne(() => Admins)
  admin: Admins;

  @HasOne(() => Students)
  student: Students;

  @HasOne(() => Instructors)
  instructor: Instructors;

  @HasOne(() => Clients)
  client: Clients;

  @HasMany(() => Messages, { foreignKey: 'sender_id' })
  sentMessages: Messages[];

  @HasMany(() => Messages, { foreignKey: 'receiver_id' })
  receivedMessages: Messages[];

  @HasMany(() => Ratings, { foreignKey: 'rating_user' })
  ratings: Ratings[];

  @HasMany(() => Payments)
  payments: Payments[];
}
