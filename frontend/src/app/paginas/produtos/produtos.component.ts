import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { ItemProdutosComponent } from '../../componentes/item-produtos/item-produtos.component';
import { Produto } from '../../models/produto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produtos',
  standalone: true,
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',
  imports: [CommonModule, CabecalhoComponent, ItemProdutosComponent],
})
export class ProdutosComponent {
  public produtos: Produto[] = [
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
