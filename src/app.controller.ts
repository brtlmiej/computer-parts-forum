import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsRepository } from './module/products/products.repository';

@Controller()
export class AppController {
  constructor(private readonly productsRepository: ProductsRepository) {}

  @Get()
  @Render('index')
  index() {
    return {};
  }

  @Get('/shop')
  @Render('shop')
  async shop() {
    return { products: await this.productsRepository.find() };
  }
}
