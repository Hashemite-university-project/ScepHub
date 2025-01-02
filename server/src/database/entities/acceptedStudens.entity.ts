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
export class AcceptedStudents extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  accepted_id: bigint;

  @ForeignKey(() => Projects)
  @Column({ type: DataType.BIGINT })
  project_id: bigint;

  @ForeignKey(() => Students)
  @Column({ type: DataType.BIGINT })
  accepted_student: bigint;

  @BelongsTo(() => Projects)
  project: Projects;

  @BelongsTo(() => Projects)
  student: Students;
}
