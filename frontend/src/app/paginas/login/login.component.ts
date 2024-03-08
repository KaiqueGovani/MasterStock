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

  constructor(public router: Router) {
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
      this.router.navigateByUrl('/dashboard');
      // Implementar requisição para entrar na conta
    } else {
      // Implementar requisição para criar uma conta
    }
  }

  public toggleEsqueceuSenha(): void {
    console.log('Esqueceu a senha.');
    this.esqueceuSenha = !this.esqueceuSenha;
  }
}
