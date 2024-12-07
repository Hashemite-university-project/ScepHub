import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Students } from './student.entity';
import { Instructors } from './instructor.entity';

@Table
export class Skills extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  skill_id: bigint;

  @Column({ type: DataType.STRING, allowNull: true })
  skill_name: string;

  @ForeignKey(() => Students)
  @ForeignKey(() => Instructors)
  @Column({ type: DataType.BIGINT, allowNull: true })
  user_id: bigint;

  @BelongsTo(() => Students)
  student: Students;

  @BelongsTo(() => Instructors)
  instructor: Instructors;
}
