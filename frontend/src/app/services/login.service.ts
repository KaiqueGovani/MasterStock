import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
import { PaginaEnum } from '../enum/pagina.enum';
import { Token } from '../models/token.model';
import axiosInstance from '../interceptors/axios.interceptor';
import {
  AUTH_PATH,
  CADASTRO_PATH,
  LOGIN_PATH,
  TOKEN_KEY,
} from './services.const';
import { Cadastro } from '../models/cadastro.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {}

  public onLogin(login: Login): void {
    axiosInstance
      .post(LOGIN_PATH, {
        email: login.email,
        password: login.senha,
      })
      .then((res) => {
        const token: Token = res.data;
        localStorage.setItem(TOKEN_KEY, token.access_token);

        this.router.navigateByUrl(PaginaEnum.dashboard);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public onLogout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigateByUrl(PaginaEnum.login);
  }

  public estaLogado(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      return false;
    }

    axiosInstance
      .get(AUTH_PATH)
      .then((res) => {
        if (res.data && res.data.valid) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.error('Erro ao verificar o status de autenticação: ', err);
        this.router.navigateByUrl(PaginaEnum.login);
        return false;
      });

    return true;
  }

  public onCadastro(cadastro: Cadastro): void {
    axiosInstance
      .post(CADASTRO_PATH, {
        nome: cadastro.nome,
        email: cadastro.email,
        senha: cadastro.senha,
        telefone: cadastro.telefone,
        endereco: cadastro.endereco,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
