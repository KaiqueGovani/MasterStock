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
  private readonly token_key: string = 'access_token';
  private readonly login_path: string = 'api/users/login';
  private readonly auth_path: string = 'api/auth/verify-jwt-token';

  constructor(private router: Router, private http: HttpClient) {}

  public onLogin(login: Login): void {
    const response = this.http.post(this.login_path, {
      email: login.email,
      password: login.senha,
    });

    response.subscribe((res: any) => {
      const token: Token = res;
      localStorage.setItem(this.token_key, token.access_token);

      this.router.navigateByUrl(PaginaEnum.dashboard);
    });
  }

  public onLogout(): void {
    localStorage.removeItem(this.token_key);
    this.router.navigateByUrl(PaginaEnum.login);
  }

  public estaLogado(): boolean {
    const token = !!localStorage.getItem(this.token_key);

    const response = this.http.post(this.auth_path, {
      access_token: token,
    });

    return true;
  }
}
