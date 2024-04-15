import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserModel } from './entities/user.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements UserModel {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ unique: false })
  telefone?: string;

  @Prop()
  endereco?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
