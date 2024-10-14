import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from './user.entity';
import { Projects } from './project.entity';

@Table
export class ProjectParticipants extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  participant_id: bigint;

  @ForeignKey(() => Projects)
  @Column({ type: DataType.BIGINT })
  project_id: bigint;

  @ForeignKey(() => Users)
  @Column({ type: DataType.BIGINT })
  student_id: bigint;

  @Column(DataType.TEXT)
  role: string;

  @BelongsTo(() => Projects)
  project: Projects;

  @BelongsTo(() => Users)
  student: Users;
}
