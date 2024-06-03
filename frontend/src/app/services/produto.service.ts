import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { Router } from '@angular/router';
import { PaginaEnum } from '../enum/pagina.enum';
import { HttpClient } from '@angular/common/http';
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
    produtos = produtos.map((prod) => {
      const { _id, ...rest } = prod;
      return rest;
    }) as Produto[];

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
      .put(PRODUTOS_PATH + `/${produto._id}`, produto)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public removerProduto(produto: Produto): Promise<void> {
    return axiosInstance
      .delete(PRODUTOS_PATH + `/${produto._id}`)
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
      ? parseFloat(produto.quantidade) <= parseFloat(produto.desejado) * 0.33
      : false;
  }
}
