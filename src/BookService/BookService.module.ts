import { Module } from '@nestjs/common';
import { BookController } from './controllers/BookController.controller';
import { BookService } from './service/BookService.service';

@Module({
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
