import { Component, OnInit } from '@angular/core';

import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { OpcaoProduto } from '../../models/opcaoProduto.model';
import { OpcaoProdutoEnum } from '../../enum/opcaoProduto.enum';
import { PaginaEnum } from '../../enum/pagina.enum';
import { VerificarService } from '../../services/verificar.service';
import { ProdutoBot } from '../../models/produtoBot.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-descricao-produto',
  standalone: true,
  templateUrl: './descricao-produto.component.html',
  styleUrl: './descricao-produto.component.css',
  imports: [CommonModule, FormsModule, CabecalhoComponent],
})
export class DescricaoProdutoComponent implements OnInit {
  public produto!: Produto;
  public produtos: Produto[] = [];

  public pagina: PaginaEnum = PaginaEnum.produtos;
  public estaEditando: boolean = false;
  public estaConfirmando: boolean = false;

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
    {
      nome: OpcaoProdutoEnum.favoritar,
      icone: 'star',
    },
  ];

  constructor(
    public produtoService: ProdutoService,
    private verificarService: VerificarService,
    public router: Router
  ) {
    this.estaConfirmando = this.verificarService.estaConfirmando();
  }
  ngOnInit(): void {
    const produtoEscolhido = this.produtoService.pegarProdutoEscolhido();
    this.produto = {
      ...produtoEscolhido,
      desejado: !!produtoEscolhido.desejado
        ? produtoEscolhido.desejado
        : 'Clique para adicionar',
      descricao: !!produtoEscolhido.descricao
        ? produtoEscolhido.descricao
        : 'Clique para adicionar',
      urlImagem: !!produtoEscolhido.urlImagem
        ? produtoEscolhido.urlImagem
        : 'https://fakeimg.pl/800x800?text=Adicionar+',
    };
    this.pagina = this.produtoService.pegarPagina();
    this.produtos = this.verificarService.pegarProdutos() as Produto[];
  }

  public estaEmFalta(): boolean {
    return this.produtoService.estaEmFalta(this.produto);
  }

  public getDataFormatada(dataS: string): string {
    const data = new Date(dataS);

    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear().toString().slice(2);

    return `${dia}/${mes}/${ano}`;
  }

  public voltar(): void {
    this.router.navigateByUrl(`/${this.pagina}`);
  }

  public realizarAcao(opcao: OpcaoProduto): void {
    switch (opcao.nome) {
      case OpcaoProdutoEnum.editar:
        this.alternarEstaEditando();
        break;

      case OpcaoProdutoEnum.adicionar:
        break;

      case OpcaoProdutoEnum.deletar:
        break;

      case OpcaoProdutoEnum.favoritar:
        break;
    }
  }

  private atualizarProdutoNaLista(): Produto[] {
    const products = this.verificarService.pegarProdutos();
    const productIdx = products.findIndex(
      (product) => product.nome === this.produto.nome
    );

    this.verificarService.guardarProdutoNoIndice(this.produto, productIdx);
    return this.verificarService.pegarProdutos() as Produto[];
  }

  public alternarEstaEditando(): void {
    this.estaEditando = !this.estaEditando;

    if (!this.estaEditando) {
      this.atualizarProdutoNaLista();
      this.router.navigateByUrl(PaginaEnum.verificarProdutos);
    }
  }
}
