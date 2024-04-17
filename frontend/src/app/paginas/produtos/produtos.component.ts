import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { ItemProdutosComponent } from '../../componentes/item-produtos/item-produtos.component';
import { Produto } from '../../models/produto.model';
import { CommonModule } from '@angular/common';
import { PaginaEnum } from '../../enum/pagina.enum';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoBot } from '../../models/produtoBot.model';
import { SemProdutosComponent } from '../../componentes/sem-produtos/sem-produtos.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',
  imports: [
    CommonModule,
    CabecalhoComponent,
    ItemProdutosComponent,
    SemProdutosComponent,
  ],
})
export class ProdutosComponent {
  public produtos: Produto[] = [];

  public pagina: PaginaEnum = PaginaEnum.produtos;

  constructor(private produtoService: ProdutoService) {
    this.carregarProdutos();
  }

  private async carregarProdutos(): Promise<void> {
    this.produtos = await this.produtoService.pegarProdutos();
  }
}
