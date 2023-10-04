import { Controller, Get } from '@nestjs/common';
import { BookService } from '../service/BookService.service';
import Book from '../interface/Book';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBookService(): Book[] {
    return this.bookService.findAll();
  }

  // @Post()
  // async create(@Body() createBook: Book) {
  //   this.bookService.create(createBook);
  // }
}
