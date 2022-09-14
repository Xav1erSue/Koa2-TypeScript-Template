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

  @Column({
    default: ''
  })
  avatar: string;

  @Column({
    default: ''
  })
  birthday: string;

  @Column({
    default: 0
  })
  sex: number;

  @Column({
    default: ''
  })
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
