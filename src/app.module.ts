import { Module } from '@nestjs/common';
import { BookModule } from './BookService/BookService.module';
import { AppController } from './app.controller';

@Module({
  imports: [BookModule],
  providers: [AppController],
})
export class AppModule {}
