import { Test, TestingModule } from '@nestjs/testing';
// import { BookController } from './BookService/service/BookService.service';
import { BookService } from './service/BookService.service';
import { Book, BookSchema } from './schemas/book.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('AssignmentService', () => {
  let service: BookService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service.findAll()).toBeDefined();
  });
});

// describe('BookService', () => {
//   let bookService: BookService;
//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       // controllers: [BookController],
//       providers: [
//         {
//           provide: getModelToken(Book.name),
//           useValue: {},
//         },
//         BookService,
//       ],

//       // imports: [Book],
//     }).compile();
//     // console.log(app);
//     bookService = app.get<BookService>(BookService);
//   });

//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       // console.log(bookService.findAll());
//       expect(bookService.findAll()).toBeDefined();
//     });
//   });
// });
