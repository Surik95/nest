import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
//import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
//import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public firstName: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ required: true })
  public lastName: string;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  // user: User;

  // @Prop(raw({
  //     latitude: { type: Number },
  //     longitude: { type: Number }
  // }))
  // public location: Location;
}

export const UserSchema = SchemaFactory.createForClass(User);
