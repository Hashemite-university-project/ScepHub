import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Projects } from './project.entity';
import { Users } from './user.entity';

@Table
export class Tasks extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  task_id: bigint;

  @ForeignKey(() => Projects)
  @Column({ type: DataType.BIGINT })
  project_id: bigint;

  @ForeignKey(() => Users)
  @Column({ type: DataType.BIGINT })
  assigned_to: bigint;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.ENUM('pending', 'in_progress', 'completed'))
  status: 'pending' | 'in_progress' | 'completed';

  @Column(DataType.DATE)
  due_date: Date;

  @BelongsTo(() => Projects)
  project: Projects;

  @BelongsTo(() => Users)
  assignedUser: Users;
}
