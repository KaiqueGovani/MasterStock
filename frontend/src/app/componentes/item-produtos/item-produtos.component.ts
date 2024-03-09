import { Component, Input } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { CommonModule } from '@angular/common';

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

  public estaEmFalta(produto: Produto): boolean {
    return produto.quantidade <= produto.desejado * 0.33;
  }
}
