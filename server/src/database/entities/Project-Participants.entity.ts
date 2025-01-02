import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Projects } from './project.entity';
import { Students } from './student.entity';

@Table
export class ProjectParticipants extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  participant_id: bigint;

  @ForeignKey(() => Projects)
  @Column({ type: DataType.BIGINT })
  project_id: bigint;

  @ForeignKey(() => Students)
  @Column({ type: DataType.BIGINT })
  student_request_id: bigint;

  @BelongsTo(() => Projects)
  project: Projects;

  @BelongsTo(() => Projects)
  student: Students;
}
