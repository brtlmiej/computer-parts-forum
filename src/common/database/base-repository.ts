import { FindManyOptions, Repository } from 'typeorm/index';
import { Paginator } from './paginator';

export class BaseRepository<T> extends Repository<T>{
  async findAll (take: number = 10, skip: number= 0, options: FindManyOptions = {}): Promise<Paginator<T>> {
    options.take = take;
    options.skip = skip;
    const [result, total] = await this.findAndCount(options);

    return {
      data: result,
      page: skip + 1,
      count: take,
      total: total,
      totalPages: Math.ceil(total / take)
    }
  }
}