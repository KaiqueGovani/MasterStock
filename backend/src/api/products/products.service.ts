import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productModel.create(createProductDto);
  }

  async createMany(createProductDtoList: CreateProductDto[]) {
    return await this.productModel.insertMany(createProductDtoList);
  }

  async findAll(): Promise<ProductDocument[]> {
    return await this.productModel.find();

    // return [
    //   {
    //     id: 1,
    //     nome: 'Coca-cola',
    //     quantidade: 2,
    //     desejado: 5,
    //     valor_unitario: '7,99',
    //     descricao: '2 litros',
    //     dataCompra: new Date(),
    //     dataValidade: new Date(),
    //     urlImagem:
    //       'https://loja.supermerclick.com.br/image/cache/catalog/produtos-integracao/003851-omie___coca-ls-1litro__conv-1000x1000.jpg',
    //   },
    //   {
    //     id: 2,
    //     nome: 'Coca-cola',
    //     quantidade: 3,
    //     desejado: 6,
    //     valor_unitario: '7,99',
    //     descricao: '2 litros',
    //     dataCompra: new Date(),
    //     dataValidade: new Date(),
    //     urlImagem:
    //       'https://loja.supermerclick.com.br/image/cache/catalog/produtos-integracao/003851-omie___coca-ls-1litro__conv-1000x1000.jpg',
    //   },
    //   {
    //     id: 3,
    //     nome: 'Coca-cola',
    //     quantidade: 1,
    //     desejado: 4,
    //     valor_unitario: '7,99',
    //     descricao: '2 litros',
    //     dataCompra: new Date(),
    //     dataValidade: new Date(),
    //     urlImagem:
    //       'https://loja.supermerclick.com.br/image/cache/catalog/produtos-integracao/003851-omie___coca-ls-1litro__conv-1000x1000.jpg',
    //   },
    //   {
    //     id: 4,
    //     nome: 'Coca-cola',
    //     quantidade: 6,
    //     desejado: 9,
    //     valor_unitario: '7,99',
    //     descricao: '2 litros',
    //     dataCompra: new Date(),
    //     dataValidade: new Date(),
    //     urlImagem:
    //       'https://loja.supermerclick.com.br/image/cache/catalog/produtos-integracao/003851-omie___coca-ls-1litro__conv-1000x1000.jpg',
    //   },
    // ];
  }

  async findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
