import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  uid: number;

  @Column()
  username: string;
  // 查询时默认不被选中
  @Column({
    select: false,
    default: ''
  })
  password: string;

  @Column()
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
