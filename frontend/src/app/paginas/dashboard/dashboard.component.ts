import {Component} from '@angular/core';
import {CabecalhoComponent} from '../../componentes/cabecalho/cabecalho.component';
import {Produto} from '../../models/produto.model';
import {CommonModule} from '@angular/common';
import {ItemProdutosComponent} from '../../componentes/item-produtos/item-produtos.component';
import {PaginaEnum} from '../../enum/pagina.enum';
import {ProdutoService} from '../../services/produto.service';
import {SemProdutosComponent} from '../../componentes/sem-produtos/sem-produtos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    CommonModule,
    CabecalhoComponent,
    ItemProdutosComponent,
    SemProdutosComponent,
  ],
})
export class DashboardComponent {
  public produtosFavoritados: Produto[] = [];
  public produtosEstaVazio: boolean = true;

  public pagina: PaginaEnum = PaginaEnum.dashboard;

  constructor(private produtoService: ProdutoService) {
    this.carregarProdutos();
  }

  private async carregarProdutos(): Promise<void> {
    const produtos = await this.produtoService.pegarProdutos();

    this.produtosFavoritados = produtos.filter(
      (produto: Produto) => produto.favoritado
    );

    this.produtosEstaVazio = this.produtosFavoritados.length === 0;
  }
}
