import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { Produto } from '../../models/produto.model';
import { CommonModule } from '@angular/common';
import { ItemProdutosComponent } from '../../componentes/item-produtos/item-produtos.component';
import { PaginaEnum } from '../../enum/pagina.enum';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoBot } from '../../models/produtoBot.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [CommonModule, CabecalhoComponent, ItemProdutosComponent],
})
export class DashboardComponent {
  public produtos: Produto[] = [];

  public pagina: PaginaEnum = PaginaEnum.dashboard;

  constructor(private produtoService: ProdutoService) {
    this.carregarProdutos();
  }

  private async carregarProdutos(): Promise<void> {
    const produtos = await this.produtoService.pegarProdutos();

    produtos.forEach((produto: ProdutoBot) => {
      this.produtos.push({ ...produto, data_compra: new Date() });
    });
  }
}
