import { Component } from '@angular/core';
import { ItemMenu } from '../../models/itensMenu.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css',
})
export class MenuLateralComponent {
  public itensMenu: ItemMenu[] = [
    {
      nome: 'Dashboard',
      icon: 'home',
      url: '/dashboard',
      ativo: false,
    },
    {
      nome: 'Produtos',
      icon: 'app_registration',
      url: '/produtos',
      ativo: false,
    },
    {
      nome: 'Lista de compras',
      icon: 'shopping_cart',
      url: '/lista-de-compras',
      ativo: false,
    },
  ];

  constructor(public router: Router) {
    this.verificaAtivo();
  }

  public navegar(url: string): void {
    this.router.navigateByUrl(url);
  }

  private verificaAtivo(): void {
    this.itensMenu.forEach((itemMenu: ItemMenu) => {
      if (itemMenu.url == this.router.url) {
        itemMenu.ativo = true;
      } else {
        itemMenu.ativo = false;
      }
    });
  }
}