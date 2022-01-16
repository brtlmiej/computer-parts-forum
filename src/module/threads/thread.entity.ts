import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('date', { nullable: true })
  deletedAt: Date;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @ManyToOne(() => User, (obj) => obj.threads)
  author: Promise<User>;

  @OneToMany(() => Comment, (obj) => obj.author)
  comments: Promise<Comment[]>;
}