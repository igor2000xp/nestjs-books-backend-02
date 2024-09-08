import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books.entity';
import { JwtStrategy } from "../../core/guards/jwt.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, JwtStrategy],
})
export class BooksModule {}
