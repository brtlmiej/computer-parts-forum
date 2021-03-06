import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './common/database/config';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './module/products/products.module';
import { ProductsRepository } from './module/products/products.repository';
import { ThreadsModule } from './module/threads/threads.module';
import { CommentsModule } from './module/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig()),
    TypeOrmModule.forFeature([ProductsRepository]),
    AuthModule,
    UsersModule,
    ProductsModule,
    ThreadsModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
