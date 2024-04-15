import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PaginaEnum } from '../enum/pagina.enum';
import { VerificarService } from '../services/verificar.service';

export const confirmandoGuard: CanActivateFn = (route, state) => {
  const estaConfirmando = inject(VerificarService).estaConfirmando();

  if (!estaConfirmando) {
    inject(Router).navigateByUrl(PaginaEnum.dashboard);
  }

  return estaConfirmando;
};
