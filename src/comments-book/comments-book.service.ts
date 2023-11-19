import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Model,
  // Connection,
  HydratedDocument,
  QueryWithHelpers,
} from 'mongoose';
import { BookComment, BookCommentDocument } from './shemas/commentsBook.schema';
import { CreateCommentsBookDto } from './dto/create-comments-book.dto';
import { UpdateCommentsBookDto } from './dto/update-comments-book.dto';

@Injectable()
export class BookCommentService {
  constructor(
    @InjectModel(BookComment.name)
    private bookCommentModel: Model<BookCommentDocument>, // @InjectConnection() private connection: Connection,
  ) {}

  public create(data: CreateCommentsBookDto): Promise<BookCommentDocument> {
    const bookComment = new this.bookCommentModel(data);
    return bookComment.save();
  }

  public findAllBookComment(bookId: string): Promise<BookCommentDocument[]> {
    return this.bookCommentModel.find({ bookId }).exec();
  }

  public update(
    id: string,
    data: UpdateCommentsBookDto,
  ): QueryWithHelpers<
    HydratedDocument<BookCommentDocument, object, object> | null,
    HydratedDocument<BookCommentDocument, object, object>,
    object,
    BookCommentDocument
  > {
    return this.bookCommentModel.findOneAndUpdate({ _id: id }, data);
  }

  public delete(
    id: string,
  ): QueryWithHelpers<
    HydratedDocument<BookCommentDocument, object, object> | null,
    HydratedDocument<BookCommentDocument, object, object>,
    object,
    BookCommentDocument
  > {
    return this.bookCommentModel.findOneAndDelete({ _id: id });
  }
  // create(book: Book) {
  //   this.books.push(book);
  // }

  // findAll(): Book[] {
  //   return this.books;
  // }
}
