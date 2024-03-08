import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',
  imports: [CabecalhoComponent],
})
export class ProdutosComponent {}
