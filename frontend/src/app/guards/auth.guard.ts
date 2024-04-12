import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../services/login.service';
import { PaginaEnum } from '../enum/pagina.enum';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  if (inject(LoginService).estaLogado()) {
    return true;
  } else {
    inject(Router).navigateByUrl(PaginaEnum.login);
    return false;
  }
};
