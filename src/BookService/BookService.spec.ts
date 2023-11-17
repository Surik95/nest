import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './service/BookService.service';
import { Book, BookSchema, BookDocument } from './schemas/book.schema';
import { getModelToken } from '@nestjs/mongoose';
import { BookController } from './controllers/BookController.controller';
import { CreateBookDto } from './interface/dto/create-bookService';
import * as mongoose from 'mongoose';

describe('AssignmentService', () => {
  let booksService: BookService;
  let booksController: BookController;
  const book: CreateBookDto = {
    title: 'string',
    description: 'string',
  };

  const bookModel = mongoose.model<BookDocument>('bookModel', BookSchema);

  const mockBooksService = {
    findAll: () => [new bookModel(book)],
    create: (book: CreateBookDto) => new bookModel(book),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBooksService,
        },
      ],
      controllers: [BookController],
    }).compile();

    booksService = module.get<BookService>(BookService);
    booksController = module.get<BookController>(BookController);
  });

  it('should be defined', async () => {
    expect(booksService).toBeDefined();
    const result = [new bookModel(book)];
    // Почему не раюотает проверка метода, я так понимаю не работает заглушка?
    jest.spyOn(booksService, 'findAll').mockResolvedValue(result);
    expect(await booksController.findAll()).toBe(result);
  });

  it('should be defined', async () => {
    expect(booksService).toBeDefined();
    const result = new bookModel(book);
    // Почему не раюотает проверка метода, я так понимаю не работает заглушка?
    jest.spyOn(booksService, 'create').mockResolvedValue(result);
    expect(await booksController.create(book)).toBe(result);
  });
});
