import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './BookService/controllers/BookController.controller';
import { BookService } from './BookService/service/BookService.service';

describe('AppController', () => {
  let bookController: BookController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    bookController = app.get<BookController>(BookController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bookController.getBookService()).toBe('Hello World!');
    });
  });
});
