import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookCommentDocument = HydratedDocument<BookComment>;

@Schema()
export class BookComment {
  @Prop({ required: true })
  public bookId: string;

  @Prop({ required: true })
  public comment: string;

  // @Prop({ required: true })
  // public id: number;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
