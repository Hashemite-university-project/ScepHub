import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from './user.entity';

@Table
export class Reports extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  report_id: bigint;

  @Column(DataType.TEXT)
  report_message: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.BIGINT })
  report_user: bigint;

  @Column(DataType.DATE)
  report_at: Date;

  @Column(DataType.TEXT)
  report_img: string;

  @Column(DataType.BOOLEAN)
  is_deleted: boolean;

  @BelongsTo(() => Users, 'report_user')
  user: Users;
}
