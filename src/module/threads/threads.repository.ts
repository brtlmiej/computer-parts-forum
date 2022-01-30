import { BaseRepository } from '../../common/database/base-repository';
import { Thread } from './thread.entity';
import { EntityRepository } from 'typeorm/index';

@EntityRepository(Thread)
export class ThreadsRepository extends BaseRepository<Thread> {
  async findOneByTitle(name: string) {
    return await this.createQueryBuilder('threads')
      .where('threads.name = :name')
      .setParameters({ name: name })
      .getOne();
  }
}