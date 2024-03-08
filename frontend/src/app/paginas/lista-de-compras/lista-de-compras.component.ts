import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';

@Component({
  selector: 'app-lista-de-compras',
  standalone: true,
  templateUrl: './lista-de-compras.component.html',
  styleUrl: './lista-de-compras.component.css',
  imports: [CabecalhoComponent],
})
export class ListaDeComprasComponent {}
