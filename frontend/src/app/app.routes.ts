import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { ListaDeComprasComponent } from './paginas/lista-de-compras/lista-de-compras.component';
import { ProdutosComponent } from './paginas/produtos/produtos.component';
import { DescricaoProdutoComponent } from './componentes/descricao-produto/descricao-produto.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'lista-de-compras',
    component: ListaDeComprasComponent,
    canActivate: [authGuard],
  },
  { path: 'produtos', component: ProdutosComponent, canActivate: [authGuard] },
  {
    path: 'produto-detalhe',
    component: DescricaoProdutoComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
