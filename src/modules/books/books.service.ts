import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { BooksRepository } from './books.repository';
import { Book } from './books.entity';
// import { PayloadJWTInterface } from '../../core/guards/jwt.strategy';
import { CreateBookDto } from './dto/create-book.dto';
import { UsersRepository } from '../users/users.repository';

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
    const id = parseInt(userId);
    const user = await this.usersRepository.findByIdOrNotFoundFail(id);
    if (!user) throw new UnauthorizedException();
    if (user.age < parseInt(dto.ageRestriction))
      throw new ForbiddenException('too yang, Bro');
    const book = new Book();
    book.title = dto.title;
    book.author = dto.author;
    book.ageRestriction = Number(dto.ageRestriction);
    book.ownerId = Number(userId);

    return await this.booksRepository.save(book);
  }
}
