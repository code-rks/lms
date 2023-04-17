import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AuthDocument = Auth & Document;

@Schema({ collection: 'auth', timestamps: true })
export class Auth {
  // User Properties
  @Prop()
  firstName: string; //required

  @Prop()
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string; //required unique

  // Auth Properties
  @Prop()
  username: string; //required unique

  @Prop()
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
