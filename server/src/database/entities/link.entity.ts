import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Students } from './student.entity';

@Table
export class Links extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  link_id: bigint;

  @Column(DataType.TEXT)
  link_name: string;

  @Column({ type: DataType.TEXT, unique: true })
  link: string;

  @Column(DataType.TEXT)
  user_link: bigint;

  @BelongsTo(() => Students, 'user_id')
  student: Students;
}
