import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// import { BookModule } from './BookService.module';
// import { getModelToken } from '@nestjs/mongoose';
import { BookSchema, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './interface/dto/create-bookService';
import { UpdateBookDto } from './interface/dto/update-bookService';
import * as mongoose from 'mongoose';
import { BookController } from './controllers/BookController.controller';
import { BookService } from './service/BookService.service';
import { JwtAuthGuard } from 'src/Auth/jwt.auth.guard';

describe('Books', () => {
  let app: INestApplication;
  const booksService = {
    findAll: async () => ['test'],
    create: async (book: CreateBookDto) => book,
    update: async (id: string, book: UpdateBookDto) => book,
    delete: async () => 'deleted',
  };

  const createBook: CreateBookDto = {
    // id: 'string',
    title: 'string',
    description: 'string',
    authors: 'string',
    fileCover: 'string',
    fileName: 'string',
  };

  const updateBook: UpdateBookDto = {
    title: 'stringUpdate',
    description: 'stringUpdate',
    authors: 'stringUpdate',
    fileCover: 'stringUpdate',
    fileName: 'stringUpdate',
  };
  const bookModel = mongoose.model<BookDocument>('bookModel', BookSchema);
  const resultCreate = new bookModel(createBook);
  const resultUpdate = new bookModel(updateBook);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(BookService)
      .useValue(booksService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET books`, async () => {
    return request(app.getHttpServer())
      .get('/book')
      .expect(200)
      .expect(await booksService.findAll());
  });

  it('/PUT update book', async () => {
    return request(app.getHttpServer())
      .put(`/book/${resultUpdate.id}`)
      .send(updateBook)
      .expect(200)
      .expect(await booksService.update(resultUpdate.id, updateBook));
  });

  it('/POST create book', async () => {
    return request(app.getHttpServer())
      .post(`/book`)
      .send(createBook)
      .expect(201)
      .expect(await booksService.create(createBook));
  });

  // it('/PUT update book', async () => {
  //   return request(app.getHttpServer())
  //     .put(`/books/${result._id}`)
  //     .send(book)
  //     .expect(200)
  //     .expect(await booksService.update(result._id, book));
  // });

  it('/DELETE delete book', async () => {
    return request(app.getHttpServer())
      .delete(`/book/${resultCreate.id}`)
      .expect(200)
      .expect(await booksService.delete());
  });

  afterAll(async () => {
    await app.close();
  });
});
