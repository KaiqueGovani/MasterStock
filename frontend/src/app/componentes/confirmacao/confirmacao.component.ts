import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-confirmacao',
  standalone: true,
  imports: [],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css'
})
export class ConfirmacaoComponent {
  @Input()
  mensagem: string = '';

  @Output()
  confirmado: EventEmitter<boolean> = new EventEmitter<boolean>();

  public confirmar(): void {
    this.confirmado.emit(true);
  }

  public cancelar(): void {
    this.confirmado.emit(false);
  }
}
