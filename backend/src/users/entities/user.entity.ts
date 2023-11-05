import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserQuestion } from './user-question.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  hobbies: string;

  @Column({ nullable: true })
  experience: number;

  @OneToMany(() => UserQuestion, (userQuestion) => userQuestion.user, {
    eager: true,
  })
  userQuestions: UserQuestion[];

  @Column({ nullable: true })
  summary: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  fact?: string;
}
