import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Contactus extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  contact_id: bigint;

  @Column(DataType.STRING(255))
  contact_name: string;

  @Column(DataType.STRING(255))
  contact_email: string;

  @Column(DataType.STRING(255))
  contact_phoneNumber: string;

  @Column(DataType.STRING(6553))
  contact_message: string;
}
