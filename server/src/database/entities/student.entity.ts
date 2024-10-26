import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from './user.entity';

@Table
export class Students extends Model {
  @ForeignKey(() => Users)
  @Column({ type: DataType.BIGINT })
  user_id: bigint;

  @Column({ type: DataType.STRING, defaultValue: null })
  skills: string;

  @Column(DataType.STRING)
  university_name: string;

  @Column({ type: DataType.BIGINT, defaultValue: null })
  enrolled_courses: bigint;

  @Column({ type: DataType.JSON, defaultValue: null })
  joined_projects: bigint[];

  @Column(DataType.STRING)
  major: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  about_me: bigint;

  @Column({ type: DataType.BIGINT, defaultValue: null })
  links: bigint;

  @Column({ type: DataType.TEXT, defaultValue: null })
  user_cv: string;

  @BelongsTo(() => Users)
  user: Users;
}
