import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from '../../core/entity/basic.entity';
import { CreateBookDto } from './dto/create-book.dto';

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
}
