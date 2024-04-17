import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { Router } from '@angular/router';
import { PaginaEnum } from '../enum/pagina.enum';
import { HttpClient } from '@angular/common/http';
import { ProdutosBot } from '../models/produtosBot.model';
import { ProdutoBot } from '../models/produtoBot.model';
import { PRODUTOS_PATH } from './services.const';
import axiosInstance from '../interceptors/axios.interceptor';
@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  public produtoEscolhido!: Produto;

  public pagina: PaginaEnum = PaginaEnum.produtos;

  constructor(private router: Router, private http: HttpClient) {}

  public pegarProdutos(): Promise<Produto[]> {
    return axiosInstance
      .get(PRODUTOS_PATH)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public guardarProdutos(produtos: Produto[]): Promise<void> {
    return axiosInstance
      .post(PRODUTOS_PATH + '/many', produtos)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public atualizarProduto(produto: Produto): Promise<void> {
    return axiosInstance
      .patch(PRODUTOS_PATH + `/${produto._id}`, produto)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public abrirDetalhe(produto: Produto, pagina: PaginaEnum): void {
    this.produtoEscolhido = produto;
    this.pagina = pagina;

    this.router.navigateByUrl('/produto-detalhe');
  }

  public pegarProdutoEscolhido(): Produto {
    return this.produtoEscolhido;
  }

  public pegarPagina(): PaginaEnum {
    return this.pagina;
  }

  public estaEmFalta(produto: Produto): boolean {
    return !!produto.desejado
      ? Number(produto.quantidade) <= Number(produto.desejado) * 0.33
      : false;
  }
}
