import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}
  @Get()
  async getAll(): Promise<Book[]> {
    return await this.bookService.getAll();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return await this.bookService.getBookById(id);
  }

  @Post()
  async createBook(@Body() bookDto: Book) {
    return bookDto;
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() bookDto: any) {
    return bookDto;
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return id;
  }
}
