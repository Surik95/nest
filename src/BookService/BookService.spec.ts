import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './service/BookService.service';
import { Book, BookSchema } from './schemas/book.schema';
import { getModelToken } from '@nestjs/mongoose';
import { BookController } from './controllers/BookController.controller';

describe('AssignmentService', () => {
  let service: BookService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: BookSchema,
        },
      ],
      controllers: [BookController],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    // Почему не раюотает проверка метода, я так понимаю не работает заглушка?
    // expect(service.findAll()).toBeDefined();
  });
});
