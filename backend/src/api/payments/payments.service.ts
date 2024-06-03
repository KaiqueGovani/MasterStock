import { Injectable } from '@nestjs/common';
// import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './payment.schema';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment>) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return await this.paymentModel.create(createPaymentDto);
  }

  async findAll() {
    // return [
    //   {
    //     nome_loja: 'Loja 1',
    //     nome_produto: 'Produto 1',
    //     valor: 100,
    //     data_pagamento: new Date(),
    //   },
    //   {
    //     nome_loja: 'Loja 2',
    //     nome_produto: 'Produto 2',
    //     valor: 200,
    //     data_pagamento: new Date(),
    //   },
    //   {
    //     nome_loja: 'Loja 3',
    //     nome_produto: 'Produto 3',
    //     valor: 300,
    //     data_pagamento: new Date(),
    //   },
    //   {
    //     nome_loja: 'Loja 4',
    //     nome_produto: 'Produto 4',
    //     valor: 400,
    //     data_pagamento: new Date(),
    //   },
    // ];
    return await this.paymentModel.find().sort({ data_hora: -1 });
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  // update(id: number, updatePaymentDto: UpdatePaymentDto) {
  //   return `This action updates a #${id} payment`;
  // }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
