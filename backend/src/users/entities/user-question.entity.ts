// Import necessary modules and decorators from TypeORM
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

// Import the User entity if you have it defined

@Entity()
export class UserQuestion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column({ nullable: true })
  summary: string;

  // Define a many-to-one relationship with the User entity
  @ManyToOne(() => User, (user) => user.userQuestions)
  user: User;

  @Column()
  userId: string; // Assuming userId is a foreign key to the User entity
}
