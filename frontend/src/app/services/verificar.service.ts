import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { ProdutoBot } from '../models/produtoBot.model';
import { ProdutosBot } from '../models/produtosBot.model';
import { PaginaEnum } from '../enum/pagina.enum';
import { Router } from '@angular/router';
import axiosInstance from '../interceptors/axios.interceptor';
import { EXTRATO_PATH } from './services.const';

@Injectable({
  providedIn: 'root',
})
export class VerificarService {
  private produtosParaVerificar: Produto[] = [];
  private produtosBot!: any;
  private valorTotal: string = '0,00';

  constructor(private router: Router) {}

  public guardarProdutos(produtosBot: ProdutosBot): void {
    const produtos = produtosBot.data.produtos;

    this.produtosBot = produtosBot;

    produtos.forEach((produto: ProdutoBot) => {
      this.produtosParaVerificar.push({
        _id: '',
        favoritado: false,
        nome: produto.nome,
        quantidade: produto.qtd_comercial,
        valor_total: produto.valor_total,
        valor_unitario: produto.valor_unitario,
        data_compra: new Date(),
      });
    });

    this.valorTotal = produtosBot.data.valor_completo;
  }

  public guardarProdutosComData(produtos: Produto[]): void {
    this.produtosParaVerificar = produtos;
  }

  public guardarProdutoNoIndice(produto: Produto, indice: number): void {
    this.produtosParaVerificar[indice] = produto;
  }

  public atualizarProduto(produtoParaAtualizar: Produto): void {
    this.produtosParaVerificar.map((produto) => {
      if (produto.nome === produtoParaAtualizar.nome) {
        this.guardarProdutoNoIndice(
          produtoParaAtualizar,
          this.produtosParaVerificar.indexOf(produto)
        );
      }
    });
  }

  public pegarProdutos(): Produto[] {
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

  public salvarProdutos(produtos: Produto[]): void {
    this.produtosBot.data.produtos = produtos;

    axiosInstance
      .post(EXTRATO_PATH, this.produtosBot.data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}
