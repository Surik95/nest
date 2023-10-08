import { Module } from '@nestjs/common';
import { BookModule } from './BookService/BookService.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    BookModule,
  ],
  providers: [AppController],
})
export class AppModule {}
