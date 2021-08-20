import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import crypto from 'crypto';
import * as bcrypt from 'bcrypt';

export type UsersDocument = User & Document;

@Schema({toJSON: {virtuals: true}, })
export class User {

  @Prop()
  id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  salt: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

const UsersSchema = SchemaFactory.createForClass(User);

export { UsersSchema }