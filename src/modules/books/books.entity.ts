import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from '../../core/entity/basic.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BadRequestException, ForbiddenException } from '@nestjs/common';

@Entity('books')
export class Book extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  ageRestriction: number; //возрастные ограничения на книгу

  @Column({ nullable: true })
  ownerId: number; //id пользователя, который добавил книгу

  @Column({ nullable: true })
  image?: string;

  public static async createBook(newBook: CreateBookDto, userId: number) {
    const book = new Book();
    book.title = newBook.title;
    book.author = newBook.author;
    book.ageRestriction = parseInt(newBook.ageRestriction);
    book.ownerId = userId;
    book.image = newBook.image;
    await book.save();
    return book;
  }

  public updateBook(dto: UpdateBookDto, book: Book, userId: number) {
    if (!book) throw new BadRequestException('Something wrong wit book');
    console.log('user', userId);
    console.log('book', book.ownerId);
    if (!userId || userId !== book.ownerId) {
      throw new ForbiddenException('This is forbidden for you');
    }
    book.title = dto.title || book.title;
    book.author = dto.title || book.author;
    book.ageRestriction = parseInt(dto.ageRestriction) || book.ageRestriction;
    book.updatedAt = new Date();
    book.image = dto.image || book.image;

    return book.save();
  }
}
