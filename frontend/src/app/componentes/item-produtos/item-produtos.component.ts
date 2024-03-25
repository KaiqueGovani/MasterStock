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

  @Input()
  public pagina: PaginaEnum = PaginaEnum.produtos;

  constructor(public produtoService: ProdutoService) {}

  public estaEmFalta(): boolean {
    return this.produtoService.estaEmFalta(this.produto);
  }

  public abrirDetalhe(): void {
    this.produtoService.abrirDetalhe(this.produto, this.pagina);
  }
}
