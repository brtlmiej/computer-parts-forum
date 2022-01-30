import { EntityRepository, Repository } from 'typeorm/index';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {}