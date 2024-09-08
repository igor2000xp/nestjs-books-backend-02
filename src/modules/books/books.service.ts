import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './books.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  // Get the list of books
  async getAll(): Promise<Book[]> {
    return await this.booksRepository.findAll();
  }

  // Get book by Id
  async getBookById(id: string): Promise<Book> {
    const idN = Number(id);
    return await this.booksRepository.findOneOrNotFoundFail(idN);
  }

  // Create book and save it into DB
  async createBook(dto: Book): Promise<Book> {
    const book = new Book();
    book.title = dto.title;
    book.author = dto.author;
    book.ageRestriction = dto.ageRestriction;

    return await this.booksRepository.save(book);
  }
}
