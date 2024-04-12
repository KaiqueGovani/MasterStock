import { Component } from '@angular/core';
import { ItemMenu } from '../../models/itensMenu.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

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
    {
      nome: 'Escanear!',
      icon: 'qr_code',
      url: '/escanear',
      ativo: false,
      classe: 'escanear',
    },
  ];

  constructor(private router: Router, private loginService: LoginService) {
    this.verificaAtivo();
  }

  public navegar(url: string): void {
    this.router.navigateByUrl(url);
  }

  public sair(): void {
    this.loginService.onLogout();
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
