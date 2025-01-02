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
export class RejectedStudents extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  rejected_id: bigint;

  @ForeignKey(() => Projects)
  @Column({ type: DataType.BIGINT })
  project_id: bigint;

  @ForeignKey(() => Students)
  @Column({ type: DataType.BIGINT })
  rejected_student: bigint;

  @BelongsTo(() => Projects)
  project: Projects;

  @BelongsTo(() => Projects)
  student: Students;
}
