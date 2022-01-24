import { Body, Controller, Get, NotFoundException, Param, Post, Redirect, Render, Res } from '@nestjs/common';
import { ThreadsRepository } from './threads.repository';
import { ThreadDto } from './dto/thread.dto';
import { Thread } from './thread.entity';
import { CommentsRepository } from '../comments/comments.repository';
import { Response } from 'express';

@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threadsRepository: ThreadsRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

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

  @Get('/:id')
  @Render('threads/show')
  async show(@Param('id') id: number) {
    const thread = await this.threadsRepository.findOne(id);
    if (!thread) {
      throw new NotFoundException()
    }
    return { thread };
  }

  @Get('create')
  @Render('threads/create')
  async create() {
    return {};
  }

  @Post()
  @Redirect('/threads')
  async store(@Body() body: ThreadDto) {
    const thread = new Thread();
    thread.title = body.title;
    thread.description = body.description;
    await this.threadsRepository.save(thread);
  }

  @Get('/:id/edit')
  @Render('threads/edit')
  async edit(@Param('id') id: number) {
    const thread = await this.threadsRepository.findOne(id);
    if (!thread) {
      throw new NotFoundException()
    }
    return { thread };
  }

  @Post('/:id')
  async update(
    @Param('id') id: number,
    @Body() body: ThreadDto,
    @Res() response: Response,
  ) {
    const thread = await this.threadsRepository.findOne(id);
    if (!thread) {
      throw new NotFoundException()
    }
    thread.title = body.title;
    thread.description = body.description;
    await this.threadsRepository.save(thread);
    await response.redirect('/threads/' + thread.id + '/edit')
  }

  @Post(':id/delete')
  @Redirect('/')
  async delete(
    @Param('id') id: number,
  ) {
    const thread = await this.threadsRepository.findOne(id);
    if (!thread) {
      throw new NotFoundException()
    }
    const comments = await thread.comments;
    await this.commentsRepository.remove(comments);
    await this.threadsRepository.remove(thread);
  }
}
