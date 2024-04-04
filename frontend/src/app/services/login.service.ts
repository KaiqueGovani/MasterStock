import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
import { PaginaEnum } from '../enum/pagina.enum';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public estaLogado: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  private readonly path: string = 'http://localhost:3000/users/';

  public onLogin(login: Login): void {
    const loginPath = this.path + 'login';

    const response = this.http.post(loginPath, {
      email: login.email,
      password: login.senha,
    });

    this.estaLogado = true;

    response.subscribe((res: any) => {
      const token: Token = res;
      localStorage.setItem('access_token', token.access_token);

      this.router.navigateByUrl(PaginaEnum.dashboard);
    });
  }

  public onLogout(): void {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl(PaginaEnum.login);
    this.estaLogado = false;
  }
}
