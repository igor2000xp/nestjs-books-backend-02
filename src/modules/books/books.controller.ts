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
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth-guard';
import { ReqUserPayLoadJWTInterface } from '../../core/guards/jwt.strategy';

@ApiTags('Books')
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

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return id;
  }
}
