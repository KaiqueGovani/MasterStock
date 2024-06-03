import { Component, Input } from '@angular/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css',
  imports: [CommonModule, MenuLateralComponent],
})
export class CabecalhoComponent {
  @Input()
  public nomePagina: string = '';

  public menuLateralAtivo: boolean = false;

  public toggleMenuLateral() {
    this.menuLateralAtivo = !this.menuLateralAtivo;

    window.scrollTo(0, 0);

    if (this.menuLateralAtivo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}
