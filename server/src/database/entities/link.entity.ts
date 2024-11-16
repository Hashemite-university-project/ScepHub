import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Students } from './student.entity';

@Table
export class Links extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  link_id: bigint;

  @Column({ type: DataType.STRING, allowNull: false })
  link_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  link: string;

  @ForeignKey(() => Students)
  @Column({ type: DataType.BIGINT })
  user_link: bigint;

  @BelongsTo(() => Students)
  student: Students;
}
