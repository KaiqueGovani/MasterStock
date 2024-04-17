import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaginaEnum } from '../../enum/pagina.enum';

@Component({
  selector: 'app-sem-produtos',
  standalone: true,
  imports: [],
  templateUrl: './sem-produtos.component.html',
  styleUrl: './sem-produtos.component.css',
})
export class SemProdutosComponent {
  constructor(private router: Router) {}

  public escanear(): void {
    this.router.navigateByUrl(PaginaEnum.escanear);
  }
}
