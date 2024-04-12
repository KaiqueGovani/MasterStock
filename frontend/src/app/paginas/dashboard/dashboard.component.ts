import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { Produto } from '../../models/produto.model';
import { CommonModule } from '@angular/common';
import { ItemProdutosComponent } from '../../componentes/item-produtos/item-produtos.component';
import { PaginaEnum } from '../../enum/pagina.enum';
import { ProdutoService } from '../../services/produto.service';

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
    this.produtoService.pegarProdutos().then((produtos: Produto[]) => {
      this.produtos = produtos;
    });
  }
}
