import { Module } from '@nestjs/common';
import { ThreadsController } from './threads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadsRepository } from './threads.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ThreadsRepository])],
  controllers: [ThreadsController]
})
export class ThreadsModule {}
