import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Model,
  // Connection,
  HydratedDocument,
  QueryWithHelpers,
} from 'mongoose';
import { Book, BookDocument } from '../schemas/book.schema';
import { CreateBookDto } from '../interface/dto/create-bookService';
import { UpdateBookDto } from '../interface/dto/update-bookService';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>, // @InjectConnection() private connection: Connection,
  ) {}

  public create(data: CreateBookDto): Promise<BookDocument> {
    console.log(data);
    const book = new this.bookModel(data);
    return book.save();
  }

  public findAll(): Promise<BookDocument[]> {
    return this.bookModel.find().exec();
  }

  public update(
    id: string,
    data: UpdateBookDto,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, object, object> | null,
    HydratedDocument<BookDocument, object, object>,
    object,
    BookDocument
  > {
    return this.bookModel.findOneAndUpdate({ _id: id }, data);
  }

  public delete(
    id: string,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, object, object> | null,
    HydratedDocument<BookDocument, object, object>,
    object,
    BookDocument
  > {
    return this.bookModel.findOneAndRemove({ _id: id });
  }
  // create(book: Book) {
  //   this.books.push(book);
  // }

  // findAll(): Book[] {
  //   return this.books;
  // }
}
