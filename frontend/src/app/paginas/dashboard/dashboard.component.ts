import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { Produto } from '../../models/produto.model';
import { CommonModule } from '@angular/common';
import { ItemProdutosComponent } from '../../componentes/item-produtos/item-produtos.component';
import { PaginaEnum } from '../../enum/pagina.enum';
import { ProdutoService } from '../../services/produto.service';
import { SemProdutosComponent } from '../../componentes/sem-produtos/sem-produtos.component';
import { DashboardService } from '../../services/dashboard.service';

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
  public totalProdutos: number = 0;
  public produtosEmFalta: number = 0;
  public valorGastoNoMes: number = 0;

  public pagina: PaginaEnum = PaginaEnum.dashboard;

  constructor(
    private produtoService: ProdutoService,
    private dashboardService: DashboardService
  ) {
    this.carregarProdutos();
    this.carregarDashboard();
  }

  private async carregarProdutos(): Promise<void> {
    const produtos = await this.produtoService.pegarProdutos();

    this.produtosFavoritados = produtos.filter(
      (produto: Produto) => produto.favoritado
    );

    this.produtosEstaVazio = this.produtosFavoritados.length === 0;
  }

  private async carregarDashboard(): Promise<void> {
    this.totalProdutos = await this.dashboardService.pegarQuantidadeProdutos();
    this.produtosEmFalta = await this.dashboardService.pegarQuantidadeEmFalta();
    this.valorGastoNoMes = await this.dashboardService.pegarValorGastoMes();

    console.log(this.totalProdutos);
    console.log(this.produtosEmFalta);
    console.log(this.valorGastoNoMes);
  }

  public formataValor(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
