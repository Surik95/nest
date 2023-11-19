import { Module } from '@nestjs/common';
import { BookCommentService } from './comments-book.service';
import { CommentsBookGateway } from './comments-book.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { BookComment, BookCommentSchema } from './shemas/commentsBook.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [CommentsBookGateway, BookCommentService],
})
export class CommentsBookModule {}
