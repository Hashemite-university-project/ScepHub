import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Courses } from './course.entity';

@Table({
  tableName: 'contents',
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  underscored: true, // Use snake_case for column names
})
export class Contents extends Model<Contents> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  video_id: bigint;

  @Column(DataType.STRING)
  video_title: string;

  @Column(DataType.TEXT)
  video_url: string;

  @Column(DataType.STRING)
  video_description: string;

  @Column({ type: DataType.INTEGER })
  video_order: number;

  @ForeignKey(() => Courses)
  @Column({ type: DataType.BIGINT })
  course_id: bigint;

  @BelongsTo(() => Courses)
  course: Courses;
}
