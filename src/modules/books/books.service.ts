import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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
  async getBookById(id: number, userId: number): Promise<Book> {
    const idN = Number(id);
    let user = null;
    if (userId) {
      user = await this.usersRepository.findByIdOrNotFoundFail(userId);
    }
    const book = await this.booksRepository.findOneOrNotFoundFail(idN);
    console.log(user);
    // console.log(user.age, book.ageRestriction);
    // if (!userId && book.ageRestriction < 18)
    if (
      (!user && book.ageRestriction >= 18) ||
      user?.age < 18 ||
      user?.age < book.ageRestriction
    )
      throw new ForbiddenException(
        'You are nor registered or bro, you are too yang now...',
      );
    if (!book) throw new BadRequestException('Something bad with book');
    // if (user && user.age < 18 && user.age < book.ageRestriction)
    //   throw new ForbiddenException('Sorry bro, you are too yang now...');

    return book;
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

  async deleteBook(id: number, userId: number) {
    if (!userId)
      throw new BadRequestException(
        'You are not register, it is forbidden for you',
      );
    const book = await this.booksRepository.findOneOrNotFoundFail(id);
    if (!book) throw new BadRequestException('There is not such book');
    const user = await this.usersRepository.findByIdOrNotFoundFail(userId);
    if (!user)
      throw new BadRequestException('Something wrong with you registration');
    if (userId !== book.ownerId)
      throw new ForbiddenException('It is not your book');

    return await this.booksRepository.remove(id);
  }
}
