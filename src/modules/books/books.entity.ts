import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/entity/base.entity';
import { ForbiddenException } from "@nestjs/common";

export interface newBookInterface {
  title: string;
  author: string;
  ageRestriction: number;
  ownerId: number;
  image?: string;
}

@Entity('books')
export class Book extends BaseEntity {
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

  public static createBook(
    newBook: newBookInterface,
    isUser: boolean,
    isYangUser: boolean,
  ) {
    if (!isUser && isYangUser) throw new ForbiddenException('You are either not registered or too young, Bro')
    const book = new Book();
    book.title = newBook.title;
    book.author = newBook.title;
    book.ageRestriction = newBook.ageRestriction;
    book.ownerId = newBook.ownerId;
    book.image = newBook.image;

    return book;
  }
}
