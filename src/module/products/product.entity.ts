import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm/index';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ charset: 'utf8mb4_unicode_ci'})
  name: string;

  @Column()
  photo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('date')
  deletedAt: Date;
}