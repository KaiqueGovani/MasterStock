import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return [
      {
        id: 1,
        nome: 'Coca-cola',
        quantidade: 2,
        desejado: 5,
        preco: 7.99,
        descricao: '2 litros',
        dataCompra: new Date(),
        dataValidade: new Date(),
        urlImagem:
          'https://loja.supermerclick.com.br/image/cache/catalog/produtos-integracao/003851-omie___coca-ls-1litro__conv-1000x1000.jpg',
      },
      {
        id: 2,
        nome: 'Coca-cola',
        quantidade: 3,
        desejado: 6,
        preco: 7.99,
        descricao: '2 litros',
        dataCompra: new Date(),
        dataValidade: new Date(),
        urlImagem:
          'https://loja.supermerclick.com.br/image/cache/catalog/produtos-integracao/003851-omie___coca-ls-1litro__conv-1000x1000.jpg',
      },
      {
        id: 3,
        nome: 'Coca-cola',
        quantidade: 1,
        desejado: 4,
        preco: 7.99,
        descricao: '2 litros',
        dataCompra: new Date(),
        dataValidade: new Date(),
        urlImagem:
          'https://loja.supermerclick.com.br/image/cache/catalog/produtos-integracao/003851-omie___coca-ls-1litro__conv-1000x1000.jpg',
      },
      {
        id: 4,
        nome: 'Coca-cola',
        quantidade: 6,
        desejado: 9,
        preco: 7.99,
        descricao: '2 litros',
        dataCompra: new Date(),
        dataValidade: new Date(),
        urlImagem:
          'https://loja.supermerclick.com.br/image/cache/catalog/produtos-integracao/003851-omie___coca-ls-1litro__conv-1000x1000.jpg',
      },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
