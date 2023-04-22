import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AuthDocument = Auth & Document;

@Schema({ collection: 'auth', timestamps: true })
export class Auth {
  @Prop({ index: true, unique: true, required: true })
  userId: string;

  // User Properties
  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  // Auth Properties
  @Prop({ required: true, unique: true, index: true })
  username: string;

  @Prop()
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
