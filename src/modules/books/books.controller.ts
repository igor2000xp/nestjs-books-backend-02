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

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}
  @Get()
  async getAll() {
    return;
  }

  @Get(':id')
  async getBookById(@Param('id') id: string) {
    return id;
  }

  @Post()
  async createBook(@Body() bookDto: any) {
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
