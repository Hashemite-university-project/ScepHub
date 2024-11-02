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

  @Column(DataType.STRING)
  link_name: string;

  @Column({ type: DataType.STRING })
  link: string;

  @Column(DataType.STRING)
  user_link: bigint;

  @BelongsTo(() => Students, 'user_id')
  student: Students;
}
