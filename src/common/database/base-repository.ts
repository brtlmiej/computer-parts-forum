import { Repository } from 'typeorm/index';
import { Paginator } from './paginator';

export class BaseRepository<T> extends Repository<T>{
  async findAll (take: number = 10, skip: number= 0): Promise<Paginator<T>> {
    const [result, total] = await this.findAndCount({
        take: take,
        skip: skip
      });

    return {
      data: result,
      page: skip + 1,
      count: take,
      total: total,
      totalPages: Math.ceil(total / take)
    }
  }
}