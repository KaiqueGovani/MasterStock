import { Component, OnInit } from '@angular/core';
import { ProdutoBot } from '../../models/produtoBot.model';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { VerificarService } from '../../services/verificar.service';
import { Produto } from '../../models/produto.model';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { PaginaEnum } from '../../enum/pagina.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-produtos',
  standalone: true,
  templateUrl: './verificar-produtos.component.html',
  styleUrl: './verificar-produtos.component.css',
  imports: [CabecalhoComponent, CommonModule],
})
export class VerificarProdutosComponent implements OnInit {
  ngOnInit(): void {
    this.verificarProdutos();
    this.valorTotal = this.verificarService.pegarValorTotal();
    this.atualizarPreco();
  }

  public produtos: Produto[] = [];
  public valorTotal: string = '';
  private readonly pagina = PaginaEnum.verificarProdutos;

  constructor(
    private verificarService: VerificarService,
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  public verificarProdutos(): void {
    const produtos = this.verificarService.pegarProdutos();

    this.produtos = produtos.map((produto: Produto) => {
      const nome = produto.nome;
      const descricao = produto.descricao || '';
      const quantidade = produto.quantidade;
      const desejado = produto.desejado || '';
      const valorUnitario = produto.valor_unitario;
      const valorTotal = produto.valor_total;
      const dataCompra = new Date();

      return {
        nome,
        descricao,
        quantidade,
        desejado,
        valor_unitario: valorUnitario,
        valor_total: valorTotal,
        data_compra: dataCompra,
      };
    });

    this.verificarService.guardarProdutosComData(this.produtos);
  }

  public aumentarQuantidade(produto: Produto): void {
    produto.quantidade = String(Number(produto.quantidade) + 1);
    this.atualizarPreco();
  }

  public diminuirQuantidade(produto: Produto): void {
    produto.quantidade = String(Number(produto.quantidade) - 1);
    this.atualizarPreco();

    if (Number(produto.quantidade) <= 1) {
      const index = this.produtos.indexOf(produto);

      if (index >= 0) {
        this.produtos.splice(index, 1);
      }

      return;
    }
  }

  private atualizarPreco(): void {
    let valorTotal = 0;
    this.produtos.forEach((produto) => {
      produto.valor_total = String(
        (
          Number(produto.valor_unitario.replace(',', '.')) *
          Number(produto.quantidade)
        ).toFixed(2)
      );
      valorTotal += Number(produto.valor_total.replace(',', '.'));
    });

    this.valorTotal = valorTotal.toFixed(2);
  }

  public confirmarProdutos(): void {
    localStorage.setItem('estaConfirmando', 'false');
    this.router.navigateByUrl(PaginaEnum.produtos);
  }

  public abrirDetalhe(produto: Produto): void {
    this.produtoService.abrirDetalhe(produto, this.pagina);
  }
}
