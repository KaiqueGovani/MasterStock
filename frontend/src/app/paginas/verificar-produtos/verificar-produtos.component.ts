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
      const _id = produto._id;
      const codigo = produto.codigo;
      const nome = produto.nome;
      const quantidade = produto.quantidade;
      const desejado = produto.desejado || '';
      const valorTotal = produto.valor_total;
      const valorUnitario = produto.valor_unitario;
      const favoritado = produto.favoritado || false;
      const descricao = produto.descricao || '';
      const dataCompra = new Date();
      const imagem = produto.imagem || '';

      return {
        _id,
        codigo,
        nome,
        quantidade,
        desejado,
        valor_total: valorTotal,
        valor_unitario: valorUnitario,
        favoritado,
        descricao,
        data_compra: dataCompra,
        imagem,
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
      console.log(produto);

      produto.quantidade = produto.quantidade.replace('.', ',');
      produto.valor_unitario = produto.valor_unitario.replace('.', '');

      // if (produto.valor_unitario.length >= 5) {
      //   produto.valor_unitario = produto.valor_unitario.slice(0, -1);
      // }

      // if (produto.quantidade.length >= 5) {
      //   produto.quantidade = produto.quantidade.slice(0, -2);
      // }

      produto.valor_total = String(
        (
          Number(produto.valor_unitario.replace(',', '.')) *
          Number(produto.quantidade.replace(',', '.'))
        )
          .toFixed(2)
          .replace('.', ',')
      );
      valorTotal += parseFloat(produto.valor_total);
    });

    this.valorTotal = valorTotal.toFixed(2).replace('.', ',');
  }

  public formataValor(valor: string): string {
    if (valor.length >= 5) {
      valor = valor.slice(0, -1);
    }

    return valor;
  }

  public formataQuantidade(quantidade: string): string {
    if (quantidade.length >= 5) {
      quantidade = quantidade.slice(0, -2);
    }
    return quantidade;
  }

  public confirmarProdutos(): void {
    localStorage.setItem('estaConfirmando', 'false');

    this.produtoService.guardarProdutos(this.produtos);
    this.verificarService.salvarProdutos(this.produtos);

    this.router.navigateByUrl(PaginaEnum.produtos);
    window.location.reload();
  }

  public abrirDetalhe(produto: Produto): void {
    this.produtoService.abrirDetalhe(produto, this.pagina);
  }
}
