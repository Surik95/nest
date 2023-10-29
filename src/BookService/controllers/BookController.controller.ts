import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';
import { BookService } from '../service/BookService.service';
import { IParamId } from '../interface/param-id';
import { CreateBookDto } from '../interface/dto/create-bookService';
import { BookDocument } from '../schemas/book.schema';
import { UpdateBookDto } from '../interface/dto/update-bookService';
import { JwtAuthGuard } from 'src/Auth/jwt.auth.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  public create(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.bookService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public findAll(): Promise<BookDocument[]> {
    return this.bookService.findAll();
  }

  @Put(':id')
  public update(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, object, object> | null,
    HydratedDocument<BookDocument, object, object>,
    object,
    BookDocument
  > {
    return this.bookService.update(id, body);
  }

  @Delete(':id')
  public delete(
    @Param() { id }: IParamId,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, object, object> | null,
    HydratedDocument<BookDocument, object, object>,
    object,
    BookDocument
  > {
    return this.bookService.delete(id);
  }

  // @Post()
  // async create(@Body() createBook: Book) {
  //   this.bookService.create(createBook);
  // }
}
