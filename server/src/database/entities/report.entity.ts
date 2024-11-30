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

  @Column(DataType.STRING)
  report_message: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.BIGINT })
  report_user: bigint;

  @Column(DataType.TEXT)
  report_img: string;

  @BelongsTo(() => Users, 'report_user')
  user: Users;
}
