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

  @Column({ type: DataType.TEXT, defaultValue: null })
  skills: string;

  @Column(DataType.TEXT)
  university_name: string;

  @Column({ type: DataType.BIGINT, defaultValue: null })
  enrolled_courses: bigint;

  @Column({ type: DataType.BIGINT, defaultValue: null })
  joined_projects: bigint;

  @Column(DataType.TEXT)
  major: string;

  @Column({ type: DataType.TEXT, defaultValue: null })
  about_me: bigint;

  @Column({ type: DataType.BIGINT, defaultValue: null })
  links: bigint;

  @Column({ type: DataType.TEXT, defaultValue: null })
  user_cv: string;

  @BelongsTo(() => Users)
  user: Users;
}
