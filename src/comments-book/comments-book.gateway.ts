import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { BookCommentService } from './comments-book.service';
import { CreateCommentsBookDto } from './dto/create-comments-book.dto';
import { UpdateCommentsBookDto } from './dto/update-comments-book.dto';

@WebSocketGateway()
export class CommentsBookGateway {
  constructor(private readonly commentsBookService: BookCommentService) {}

  @SubscribeMessage('addComment')
  create(@MessageBody() createCommentsBookDto: CreateCommentsBookDto) {
    return this.commentsBookService.create(createCommentsBookDto);
  }

  @SubscribeMessage('getAllComments')
  findAll(@MessageBody() createCommentsBookDto: CreateCommentsBookDto) {
    return this.commentsBookService.findAllBookComment(
      createCommentsBookDto.bookId,
    );
  }

  @SubscribeMessage('updateCommentsBook')
  update(@MessageBody() updateCommentsBookDto: UpdateCommentsBookDto) {
    return this.commentsBookService.update(
      updateCommentsBookDto.id,
      updateCommentsBookDto,
    );
  }

  @SubscribeMessage('removeCommentsBook')
  remove(@MessageBody() id: string) {
    return this.commentsBookService.delete(id);
  }
}
