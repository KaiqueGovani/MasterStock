import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop({ required: true })
  nome_loja: string;

  @Prop({ required: true })
  nome_produto: string;

  @Prop({ required: true, default: 0 })
  valor: number;

  @Prop({ required: true, default: new Date() })
  data_pagamento: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
