import { Module } from '@nestjs/common';
import { BookController } from './controllers/BookController.controller';
import { BookService } from './service/BookService.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: getModelToken(Book.name),
      useValue: jest.fn,
    },
  ],
  exports: [BookService],
})
export class BookModule {}
