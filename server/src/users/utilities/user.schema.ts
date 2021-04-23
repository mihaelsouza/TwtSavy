import { ClientPayload } from '../../analyze/utilities/client.payload.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

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
    data: ClientPayload;
  }[]
};

export const UserSchema = SchemaFactory.createForClass(User);