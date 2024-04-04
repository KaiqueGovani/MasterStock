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

  constructor(private router: Router, private loginService: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.cadastroForm = new FormGroup(
      {
        nome: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        senha: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmSenha: new FormControl('', [Validators.required]),
      },
      { validators: this.verificaSenhas }
    );
  }

  private verificaSenhas(control: AbstractControl) {
    return control.get('senha')?.value === control.get('confirmSenha')?.value
      ? null
      : { mismatch: true };
  }

  public enviar(): void {
    if (this.isLogin) {
      const login: Login = {
        email: this.loginForm.value.email,
        senha: this.loginForm.value.senha,
      };

      this.loginService.onLogin(login);
    } else {
      // Implementar requisição para criar uma conta
    }
  }

  public toggleEsqueceuSenha(): void {
    console.log('Esqueceu a senha.');
    this.esqueceuSenha = !this.esqueceuSenha;
  }
}
