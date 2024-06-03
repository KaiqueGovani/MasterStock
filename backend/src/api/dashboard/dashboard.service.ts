import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../products/product.schema';
import { Payment } from '../payments/payment.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Product.name) private products: Model<Product>,
    @InjectModel(Payment.name) private payments: Model<Payment>,
  ) {}

  async totalProducts() {
    return await this.products.countDocuments();
  }

  async productsNeed() {
    return await this.products.aggregate([
      {
        $project: {
          nome: 1,
          diferenca: {
            $divide: [
              {
                $convert: {
                  input: { $replaceAll: { input: '$quantidade', find: ',', replacement: '.' } },
                  to: 'double',
                  onError: 1,
                  onNull: 1,
                },
              },
              {
                $convert: {
                  input: { $replaceAll: { input: '$desejado', find: ',', replacement: '.' } },
                  to: 'double',
                  onError: 1,
                  onNull: 1,
                },
              },
            ],
          },
        },
      },
      {
        $match: {
          diferenca: { $gt: 3 },
        },
      },
      {
        $count: 'total',
      },
    ]);
  }

  async paymentsMonthValue() {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 90);

    const result = await this.payments.aggregate([
      {
        // Filtra documentos dentro dos últimos 30 dias
        $match: {
          data_hora: {
            $gte: thirtyDaysAgo, // Data 30 dias atrás
          },
        },
      },
      {
        // Converte o valor_completo de string para número e lida com possíveis erros de conversão
        $addFields: {
          valor_numerico: {
            $convert: {
              input: { $replaceAll: { input: '$valor_completo', find: ',', replacement: '.' } },
              to: 'double',
              onError: 0,
              onNull: 0,
            },
          },
        },
      },
      {
        // Agrupa todos os documentos (null porque não estamos agrupando por um campo específico)
        $group: {
          _id: null,
          total: { $sum: '$valor_numerico' }, // Soma dos valores convertidos
        },
      },
    ]);

    return result;
  }
}
