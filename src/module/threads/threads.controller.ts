import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Redirect,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ThreadsRepository } from './threads.repository';
import { ThreadDto } from './dto/thread.dto';
import { Thread } from './thread.entity';
import { CommentsRepository } from '../comments/comments.repository';
import { Response } from 'express';
import { AuthenticatedGuard } from '../auth/guard/authenticated.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/user.entity';

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

  @UseGuards(AuthenticatedGuard)
  @Get('/create')
  @Render('threads/create')
  async create() {
    return {};
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

  @UseGuards(AuthenticatedGuard)
  @Post()
  async store(@Body() body: ThreadDto, @Res() res: Response) {
    const thread = new Thread();
    thread.title = body.title;
    thread.description = body.description;
    await this.threadsRepository.save(thread);
    res.redirect('/threads/' + thread.id + '/edit');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/:id/edit')
  @Render('threads/edit')
  async edit(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ) {
    const thread = await this.threadsRepository.findOne(id);
    if (!thread || (await thread.author).id != user.id) {
      throw new NotFoundException()
    }
    return { thread };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/:id')
  async update(
    @Param('id') id: number,
    @Body() body: ThreadDto,
    @Res() response: Response,
    @CurrentUser() user: User,
  ) {
    const thread = await this.threadsRepository.findOne(id);
    if (!thread || (await thread.author).id != user.id) {
      throw new NotFoundException()
    }
    thread.title = body.title;
    thread.description = body.description;
    await this.threadsRepository.save(thread);
    await response.redirect('/threads/' + thread.id + '/edit')
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/:id/delete')
  @Redirect('/')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ) {
    const thread = await this.threadsRepository.findOne(id);
    if (!thread || (await thread.author).id != user.id) {
      throw new NotFoundException()
    }
    const comments = await thread.comments;
    await this.commentsRepository.remove(comments);
    await this.threadsRepository.remove(thread);
  }
}
