import { Component, OnInit } from '@angular/core';

import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OpcaoProduto } from '../../models/opcaoProduto.model';
import { OpcaoProdutoEnum } from '../../enum/opcaoProduto.enum';
import { PaginaEnum } from '../../enum/pagina.enum';
import { VerificarService } from '../../services/verificar.service';
import { FormsModule } from '@angular/forms';
import { ConfirmacaoComponent } from '../confirmacao/confirmacao.component';

@Component({
  selector: 'app-descricao-produto',
  standalone: true,
  templateUrl: './descricao-produto.component.html',
  styleUrl: './descricao-produto.component.css',
  imports: [
    CommonModule,
    FormsModule,
    CabecalhoComponent,
    ConfirmacaoComponent,
  ],
})
export class DescricaoProdutoComponent implements OnInit {
  public produto!: Produto;
  public produtos: Produto[] = [];

  public pagina: PaginaEnum = PaginaEnum.produtos;
  public estaEditando: boolean = false;
  public estaConfirmando: boolean = false;
  public mensagemConfirmacao: string = '';
  public mostrarMensagemConfirmacao: boolean = false;

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
  protected readonly OpcaoProdutoEnum = OpcaoProdutoEnum;

  constructor(
    public produtoService: ProdutoService,
    private verificarService: VerificarService,
    public router: Router
  ) {
    this.estaConfirmando = this.verificarService.estaConfirmando();
  }

  ngOnInit(): void {
    this.produto = this.produtoService.pegarProdutoEscolhido();
    this.pagina = this.produtoService.pegarPagina();
    this.produtos = this.verificarService.pegarProdutos();
    this.mensagemConfirmacao = `Deseja excluir o produto: ${this.produto.nome}?`;

    const isEmpty: boolean = Object.keys(this.produto).length === 0;

    if (isEmpty) {
      this.voltar();
    }
  }

  public estaEmFalta(): boolean {
    return this.produtoService.estaEmFalta(this.produto);
  }

  public getDataFormatada(dataS: string): string {
    const data: Date = new Date(dataS);

    const dia: string = data.getDate().toString().padStart(2, '0');
    const mes: string = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano: string = data.getFullYear().toString().slice(2);

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
        this.aumentarQuantidade();
        break;

      case OpcaoProdutoEnum.deletar:
        this.diminuirQuantidade();
        break;

      case OpcaoProdutoEnum.favoritar:
        this.favoritar();
        break;
    }
  }

  public alternarEstaEditando(): void {
    this.estaEditando = !this.estaEditando;

    if (!this.estaEditando) {
      if (this.estaConfirmando) {
        this.verificarService.atualizarProduto(this.produto);
      } else {
        this.produtoService.atualizarProduto(this.produto);
      }
    }
  }

  public aumentarQuantidade(): void {
    console.log(parseFloat(this.produto.quantidade));

    const quantidade: string = `${String(
      parseFloat(this.produto.quantidade) + 1
    )},00`;

    this.produto.quantidade = String(quantidade);

    if (this.estaConfirmando) {
      this.verificarService.atualizarProduto(this.produto);
    } else {
      this.produtoService.atualizarProduto(this.produto);
    }
  }

  public diminuirQuantidade(): void {
    if (Number(this.produto.quantidade) < 1) {
      this.mostrarMensagemConfirmacao = !this.mostrarMensagemConfirmacao;

      return;
    }

    const quantidade: string = `${String(
      parseFloat(this.produto.quantidade) - 1
    )},00`;

    this.produto.quantidade = String(quantidade);

    if (this.estaConfirmando) {
      this.verificarService.atualizarProduto(this.produto);
    } else {
      this.produtoService.atualizarProduto(this.produto);
    }
  }

  public aoConfirmar(resultado: boolean): void {
    if (resultado) {
      this.produtoService.removerProduto(this.produto);
      this.router.navigateByUrl(this.pagina);
    }

    this.mostrarMensagemConfirmacao = !this.mostrarMensagemConfirmacao;
  }

  public favoritar(): void {
    this.produto.favoritado = !this.produto.favoritado;

    this.produtoService.atualizarProduto(this.produto);
  }
}
