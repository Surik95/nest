import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { BookCommentService } from './comments-book.service';
import { CreateCommentsBookDto } from './dto/create-comments-book.dto';
import { UpdateCommentsBookDto } from './dto/update-comments-book.dto';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class CommentsBookGateway {
  constructor(private readonly commentsBookService: BookCommentService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('addComment')
  create(
    @MessageBody() createCommentsBookDto: CreateCommentsBookDto,
    // @ConnectedSocket() client: Socket,
  ) {
    console.log(createCommentsBookDto);
    return this.commentsBookService.create(createCommentsBookDto);
  }

  @SubscribeMessage('getAllComments')
  findAll(@MessageBody() bookId: string) {
    console.log(bookId);
    return this.commentsBookService.findAllBookComment(bookId);
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
// function WebSocketServer(): (
//   target: CommentsBookGateway,
//   propertyKey: 'server',
// ) => void {
//   throw new Error('Function not implemented.');
// }
