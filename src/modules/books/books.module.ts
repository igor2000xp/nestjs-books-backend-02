import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books.entity';
import { JwtStrategy } from '../../core/guards/jwt.strategy';
import { User } from '../users/user.entity';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User])],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, JwtStrategy, UsersRepository],
})
export class BooksModule {}
