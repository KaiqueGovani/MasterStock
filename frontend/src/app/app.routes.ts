import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { ProdutosComponent } from './paginas/produtos/produtos.component';
import { DescricaoProdutoComponent } from './componentes/descricao-produto/descricao-produto.component';
import { authGuard } from './guards/auth.guard';
import { EscanearComponent } from './componentes/escanear/escanear.component';
import { VerificarProdutosComponent } from './paginas/verificar-produtos/verificar-produtos.component';
import { confirmandoGuard } from './guards/confirmando.guard';
import { ExtratoComponent } from './paginas/extrato/extrato.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'escanear',
    component: EscanearComponent,
    canActivate: [authGuard],
  },
  {
    path: 'verificar-produtos',
    component: VerificarProdutosComponent,
    canActivate: [authGuard, confirmandoGuard],
  },
  { path: 'produtos', component: ProdutosComponent, canActivate: [authGuard] },
  {
    path: 'produto-detalhe',
    component: DescricaoProdutoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'extrato',
    component: ExtratoComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];
