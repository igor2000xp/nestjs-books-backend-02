import { ForbiddenException, Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UsersRepository } from '../users/users.repository';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

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
  async createBook(dto: CreateBookDto, userId: string): Promise<Book> {
    const user = await this.usersRepository.findByIdOrNotFoundFail(
      parseInt(userId),
    );
    if (!user && user.age < parseInt(dto.ageRestriction))
      throw new ForbiddenException(
        'You are either not registered or too young, Bro',
      );
    return await Book.createBook(dto, user.id);
  }

  async updateBook(dto: UpdateBookDto, bookId: string, userId: string) {
    const book = await this.booksRepository.findOneOrNotFoundFail(
      parseInt(bookId),
    );

    return await book.updateBook(dto, book, parseInt(userId));
  }
}
