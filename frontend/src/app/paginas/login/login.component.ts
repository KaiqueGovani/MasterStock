import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Login } from '../../models/login.model';
import { Cadastro } from '../../models/cadastro.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public isLogin: boolean = true;
  public esqueceuSenha: boolean = false;

  public loginForm: FormGroup;
  public cadastroForm: FormGroup;

  public passo: 1 | 2 = 1;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    this.cadastroForm = new FormGroup({
      passo1: new FormGroup(
        {
          email: new FormControl('', [Validators.required, Validators.email]),
          senha: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
          ]),
          confirmSenha: new FormControl('', [Validators.required]),
        },
        { validators: this.verificaSenhas }
      ),
      passo2: new FormGroup({
        nome: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        endereco: new FormControl('', [Validators.required]),
        telefone: new FormControl('', [
          Validators.required,
          Validators.maxLength(11),
        ]),
      }),
    });
  }

  private verificaSenhas(control: AbstractControl) {
    return control.get('senha')?.value === control.get('confirmSenha')?.value
      ? null
      : { mismatch: true };
  }

  public proximoPasso(): void {
    this.passo += 1;
  }

  public enviar(): void {
    if (this.isLogin) {
      const login: Login = {
        email: this.loginForm.value.email,
        senha: this.loginForm.value.senha,
      };

      this.loginService.onLogin(login);
    } else {
      const cadastro: Cadastro = {
        nome: this.cadastroForm.value.passo2.nome,
        email: this.cadastroForm.value.passo1.email,
        senha: this.cadastroForm.value.passo1.senha,
        telefone: this.cadastroForm.value.passo2.telefone,
        endereco: this.cadastroForm.value.passo2.endereco,
      };

      this.loginService.onCadastro(cadastro);
      this.isLogin = !this.isLogin;
    }
  }

  public toggleEsqueceuSenha(): void {
    console.log('Esqueceu a senha.');
    this.esqueceuSenha = !this.esqueceuSenha;
  }
}
