import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Users } from './user.entity';
import { Projects } from './project.entity';
import { Courses } from './course.entity';

@Table({
  tableName: 'instructors',
  timestamps: true,
  underscored: true,
})
export class Instructors extends Model<Instructors> {
  @ForeignKey(() => Users)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    comment: 'Foreign key to Users table',
  })
  user_id: bigint;

  @Column({
    type: DataType.STRING(65535),
    allowNull: true,
    comment: 'Google ID of the instructor',
  })
  google_id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Skills of the instructor',
  })
  skills: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Major field of study or expertise',
  })
  major: string;

  @Column({
    type: DataType.STRING(6553),
    allowNull: true,
    comment: 'Brief biography of the instructor',
  })
  about_me: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    comment: 'Links to external profiles or resources',
  })
  links: bigint;

  @Column({
    type: DataType.STRING(65535),
    allowNull: true,
    comment: "Link to the instructor's CV",
  })
  user_cv: string;

  @BelongsTo(() => Users, { onDelete: 'CASCADE' })
  user: Users;

  @HasMany(() => Projects, { foreignKey: 'project_instructor' })
  projects: Projects[];

  @HasMany(() => Courses, { foreignKey: 'course_instructor' })
  courses: Courses[];
}
