import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PaymentModel } from './entities/payment.entity';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment implements PaymentModel {
  @Prop({ required: true })
  nome_razao_social: string;

  @Prop({ required: true })
  numero_cfe: string;

  @Prop({ required: true })
  produtos: any[];

  @Prop({ required: true, default: 0 })
  valor_completo: string;

  @Prop({ required: true, default: new Date() })
  data_hora: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
