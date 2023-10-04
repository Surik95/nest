import { Injectable } from '@nestjs/common';
import Book from '../interface/Book';

@Injectable()
export class BookService {
  private readonly books: Book[] = [
    {
      title: 'string',
      description: 'string',
      authors: 'string',
      favorite: true,
      fileCover: 'string',
      fileName: 'string',
      views: 'string',
      id: 'string',
    },
  ];

  // create(book: Book) {
  //   this.books.push(book);
  // }

  findAll(): Book[] {
    return this.books;
  }
}
