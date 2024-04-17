import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductModel } from './entities/product.entity';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product implements ProductModel {
  @Prop({ required: true })
  codigo: string;

  @Prop({ required: true })
  nome: string;

  @Prop()
  quantidade?: string;

  @Prop()
  desejado?: string;

  @Prop({ required: true })
  valor_total: string;

  @Prop({ required: true })
  valor_unitario: string;

  @Prop()
  descricao?: string;

  @Prop({ required: true })
  data_compra: string;

  @Prop()
  imagem?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
