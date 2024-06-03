import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { Compra } from '../../models/compra.model';
import { CommonModule } from '@angular/common';
import { ExtratoService } from '../../services/extrato.service';

@Component({
  selector: 'app-extrato',
  standalone: true,
  templateUrl: './extrato.component.html',
  styleUrl: './extrato.component.css',
  imports: [CabecalhoComponent, CommonModule],
})
export class ExtratoComponent {
  public compras: Compra[] = [];

  constructor(private extratoService: ExtratoService) {
    this.carregarExtrato();
  }

  public getDataFormatada(dataS: string): string {
    const data: Date = new Date(dataS);

    const opcoesDiaSemana: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const opcoesData: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    };

    let nomeDiaSemana: string = new Intl.DateTimeFormat(
      'pt-BR',
      opcoesDiaSemana
    ).format(data);
    const dataFormatada: string = new Intl.DateTimeFormat(
      'pt-BR',
      opcoesData
    ).format(data);

    nomeDiaSemana =
      nomeDiaSemana.charAt(0).toUpperCase() + nomeDiaSemana.slice(1);

    return `${nomeDiaSemana}, ${dataFormatada}`;
  }

  public getValorFormatado(valorS: string): string {
    const valor = parseFloat(valorS);
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
    return `-${valorFormatado}`;
  }

  private async carregarExtrato(): Promise<void> {
    this.compras = await this.extratoService.pegarExtrato();
  }
}
