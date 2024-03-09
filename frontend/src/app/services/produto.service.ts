import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  public produtoEscolhido: Produto = {
    id: 0,
    nome: '',
    quantidade: 0,
    desejado: 0,
    preco: 0,
    descricao: '',
    dataCompra: new Date(),
    dataValidade: new Date(),
    urlImagem: '',
  };

  constructor(public router: Router) {}

  public abrirDetalhe(produto: Produto): void {
    this.produtoEscolhido = produto;

    this.router.navigateByUrl('/produto-detalhe');
  }

  public pegarProduto(): Produto {
    return this.produtoEscolhido;
  }

  public estaEmFalta(produto: Produto): boolean {
    return produto.quantidade <= produto.desejado * 0.33;
  }
}
