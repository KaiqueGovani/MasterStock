import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { ItemProdutosComponent } from '../../componentes/item-produtos/item-produtos.component';
import { Produto } from '../../models/produto.model';
import { CommonModule } from '@angular/common';
import { PaginaEnum } from '../../enum/pagina.enum';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',
  imports: [CommonModule, CabecalhoComponent, ItemProdutosComponent],
})
export class ProdutosComponent {
  public produtos: Produto[] = [];

  public pagina: PaginaEnum = PaginaEnum.produtos;

  constructor(private produtoService: ProdutoService) {
    this.produtoService.pegarProdutos().subscribe((res: any) => {
      this.produtos = res;
    });
  }
}
