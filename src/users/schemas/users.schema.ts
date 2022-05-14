import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop()
  _id: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  loggedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
