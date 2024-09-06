import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './books.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  // Получить список всех книг
  async getAll(): Promise<Book[]> {
    return await this.booksRepository.findAll();
  }

  // Получить книгу по ID
  async getBookById(id: string): Promise<Book> {
    const idN = Number(id);
    return await this.booksRepository.findOneOrNotFoundFail(idN);
  }
}
