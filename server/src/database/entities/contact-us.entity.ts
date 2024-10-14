import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Contactus extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  contact_id: bigint;

  @Column(DataType.TEXT)
  contact_name: string;

  @Column(DataType.TEXT)
  contact_email: string;

  @Column(DataType.TEXT)
  contact_phoneNumber: string;

  @Column(DataType.TEXT)
  contact_message: string;
}
