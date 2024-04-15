import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { ProdutoBot } from '../models/produtoBot.model';
import { ProdutosBot } from '../models/produtosBot.model';
import { PaginaEnum } from '../enum/pagina.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VerificarService {
  private produtosParaVerificar: ProdutoBot[] = [];
  private valorTotal: string = '0,00';

  constructor(private router: Router) {}

  public guardarProdutos(produtos: ProdutosBot): void {
    this.produtosParaVerificar = produtos.produtos;
    this.valorTotal = produtos.valor_completo;
  }

  public guardarProdutosComData(produtos: Produto[]): void {
    this.produtosParaVerificar = produtos;
  }

  public guardarProdutoNoIndice(produto: Produto, indice: number): void {
    this.produtosParaVerificar[indice] = produto;
  }

  public pegarProdutos(): ProdutoBot[] {
    return this.produtosParaVerificar;
  }

  public pegarValorTotal(): string {
    return this.valorTotal;
  }

  public estaConfirmando(): boolean {
    const estaConfirmando = localStorage.getItem('estaConfirmando');

    if (estaConfirmando === 'true') {
      return true;
    } else {
      return false;
    }
  }
}
