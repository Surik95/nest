import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
//import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
//import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public description: string;

  @Prop({ required: true })
  public authors: string;

  @Prop()
  public favorite: boolean;

  @Prop()
  public fileCover: string;

  @Prop()
  public fileName: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
