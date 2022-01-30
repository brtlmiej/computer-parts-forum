import { EntityRepository, Repository } from 'typeorm/index';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product>{}