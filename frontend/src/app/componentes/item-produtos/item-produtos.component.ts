import { Component, Input } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { PaginaEnum } from '../../enum/pagina.enum';

@Component({
  selector: 'app-item-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-produtos.component.html',
  styleUrl: './item-produtos.component.css',
})
export class ItemProdutosComponent {
  @Input()
  public produto!: Produto;

  @Input()
  public pagina: PaginaEnum = PaginaEnum.produtos;

  constructor(public produtoService: ProdutoService) {}

  public estaEmFalta(): boolean {
    return this.produtoService.estaEmFalta(this.produto);
  }

  public abrirDetalhe(): void {
    this.produtoService.abrirDetalhe(this.produto, this.pagina);
  }

  public temDesejado(): boolean {
    if (!!this.produto.desejado && Number(this.produto.desejado) > 0) {
      return true;
    }

    return false;
  }
}
