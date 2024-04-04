import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { Router } from '@angular/router';
import { PaginaEnum } from '../enum/pagina.enum';
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

  public pagina: PaginaEnum = PaginaEnum.produtos;

  constructor(private router: Router) {}

  public abrirDetalhe(produto: Produto, pagina: PaginaEnum): void {
    this.produtoEscolhido = produto;
    this.pagina = pagina;

    this.router.navigateByUrl('/produto-detalhe');
  }

  public pegarProduto(): Produto {
    return this.produtoEscolhido;
  }

  public pegarPagina(): PaginaEnum {
    return this.pagina;
  }

  public estaEmFalta(produto: Produto): boolean {
    return produto.quantidade <= produto.desejado * 0.33;
  }
}
