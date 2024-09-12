import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth-guard';
import {
  JwtStrategy,
  ReqUserPayLoadJWTInterface,
} from '../../core/guards/jwt.strategy';
import { OptionalJwtStrategy } from '../../core/guards/optional-jwt-strategy';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}
  @Get()
  async getAll(): Promise<Book[]> {
    return await this.bookService.getAll();
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getBookById(
    @Param('id') id: string,
    @Request() req: ReqUserPayLoadJWTInterface,
  ): Promise<Book> {
    let userId = 0;
    console.log('userId-0 = ', req.user?.userId);
    if (!req.user) {
      userId = 0;
    } else {
      userId = parseInt(req.user.userId);
    }
    console.log('userId-1 = ', userId);
    // if (!req.user.userId) throw new ForbiddenException('You are not authorize');
    return await this.bookService.getBookById(parseInt(id), userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBook(
    @Body() bookDto: CreateBookDto,
    @Request() req: ReqUserPayLoadJWTInterface,
  ) {
    return await this.bookService.createBook(bookDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Request() req: ReqUserPayLoadJWTInterface,
    @Body() bookDto: UpdateBookDto,
  ) {
    return this.bookService.updateBook(bookDto, id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBook(
    @Param('id') id: string,
    @Request() req: ReqUserPayLoadJWTInterface,
  ) {
    await this.bookService.deleteBook(parseInt(id), parseInt(req.user.userId));
    return { response: `OK. The book with ID: ${id} successfully is deleted` };
  }
}
