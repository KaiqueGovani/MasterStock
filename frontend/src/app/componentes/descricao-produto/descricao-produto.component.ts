import { Component } from '@angular/core';

import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { OpcaoProduto } from '../../models/opcaoProduto.model';
import { OpcaoProdutoEnum } from '../../enum/opcaoProduto.enum';
import { PaginaEnum } from '../../enum/pagina.enum';

@Component({
  selector: 'app-descricao-produto',
  standalone: true,
  templateUrl: './descricao-produto.component.html',
  styleUrl: './descricao-produto.component.css',
  imports: [CommonModule, CabecalhoComponent],
})
export class DescricaoProdutoComponent {
  public produto: Produto = {
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

  public opcoes: OpcaoProduto[] = [
    {
      nome: OpcaoProdutoEnum.editar,
      icone: 'edit',
    },
    {
      nome: OpcaoProdutoEnum.adicionar,
      icone: 'add',
    },
    {
      nome: OpcaoProdutoEnum.deletar,
      icone: 'delete',
    },
  ];

  constructor(public produtoService: ProdutoService, public router: Router) {
    this.produto = this.produtoService.pegarProduto();
    this.pagina = this.produtoService.pegarPagina();
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

  public voltar(): void {
    this.router.navigateByUrl(`/${this.pagina}`);
  }

  public realizarAcao(acao: string): void {
    console.log(acao);
  }
}
