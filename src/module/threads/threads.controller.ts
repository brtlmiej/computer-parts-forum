import { Controller, Get, Render } from '@nestjs/common';
import { ThreadsRepository } from './threads.repository';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsRepository: ThreadsRepository) {}

  @Get()
  @Render('threads/index')
  async index() {
    const threads = await this.threadsRepository
      .findAll(20, 0, {
        relations: ['author', 'comments'],
        order: { createdAt: 'DESC' }
      });
    return { threads };
  }
}
