import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Users } from './user.entity';

@Table
export class Groups extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  group_id: bigint;

  @Column(DataType.STRING)
  group_name: string;

  @HasMany(() => Users, 'group_id')
  members: Users[];
}
