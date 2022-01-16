import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm/index';
import { User } from '../users/user.entity';
import { Thread } from '../threads/thread.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('date')
  deletedAt: Date;

  @Column({ type: 'text', charset: 'utf8_unicode_ci' })
  content: string;

  @Column('int')
  votes: number;

  @ManyToOne(() => User, (obj) => obj.comments)
  author: Promise<User>;

  @ManyToOne(() => Thread, (obj) => obj.comments)
  thread: Promise<Thread>;
}