import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
  @Prop()
  user_id: string;

  @Prop()
  is_revoked: boolean;

  @Prop()
  expires: Date;
}

const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

export { RefreshTokenSchema }