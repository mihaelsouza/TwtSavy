import { ClientPayloadDTO } from '../../analyze/utilities/client.payload-dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  username: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: false})
  twitter_handle: string;

  @Prop({required: false})
  searches: {
    query: string;
    data: ClientPayloadDTO;
  }[]
};

export const UserSchema = SchemaFactory.createForClass(User);