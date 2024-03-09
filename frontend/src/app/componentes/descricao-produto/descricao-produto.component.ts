import { Component } from '@angular/core';

import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-descricao-produto',
  standalone: true,
  templateUrl: './descricao-produto.component.html',
  styleUrl: './descricao-produto.component.css',
  imports: [CommonModule, CabecalhoComponent],
})
export class DescricaoProdutoComponent {
  public produto: Produto = {
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
  };

  constructor(public produtoService: ProdutoService) {
    this.produto = this.produtoService.pegarProduto();
  }

  public estaEmFalta(): boolean {
    return this.produtoService.estaEmFalta(this.produto);
  }

  public getDataFormatada(data: Date): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear().toString().slice(2);

    return `${dia}/${mes}/${ano}`;
  }
}
