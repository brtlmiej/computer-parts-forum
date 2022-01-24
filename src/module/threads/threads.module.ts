import { Module } from '@nestjs/common';
import { ThreadsController } from './threads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadsRepository } from './threads.repository';
import { CommentsRepository } from '../comments/comments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    ThreadsRepository,
    CommentsRepository
  ])],
  controllers: [ThreadsController]
})
export class ThreadsModule {}
