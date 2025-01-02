import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Projects } from './project.entity';

@Table
export class ProjectParticipants extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  participant_id: bigint;

  @ForeignKey(() => Projects)
  @Column({ type: DataType.BIGINT })
  project_id: bigint;

  @Column({ type: DataType.JSON })
  joined_Students: bigint[];

  @Column({ type: DataType.JSON })
  students_requests: bigint[];

  @Column({ type: DataType.JSON })
  rejected_students: bigint[];

  @BelongsTo(() => Projects)
  project: Projects;
}
