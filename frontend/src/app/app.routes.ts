import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { ListaDeComprasComponent } from './paginas/lista-de-compras/lista-de-compras.component';
import { ProdutosComponent } from './paginas/produtos/produtos.component';
import { DescricaoProdutoComponent } from './componentes/descricao-produto/descricao-produto.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lista-de-compras', component: ListaDeComprasComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'produto-detalhe', component: DescricaoProdutoComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
