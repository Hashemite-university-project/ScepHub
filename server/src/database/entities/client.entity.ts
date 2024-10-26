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
export class Clients extends Model {
  @ForeignKey(() => Users)
  @Column({ type: DataType.BIGINT })
  user_id: bigint;

  @Column({ type: DataType.STRING, defaultValue: null })
  company_name: string;

  @Column({ type: DataType.BIGINT, defaultValue: null })
  project_request: bigint;

  @BelongsTo(() => Users)
  user: Users;
}
