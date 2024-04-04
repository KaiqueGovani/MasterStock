import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function CustomInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const localToken = localStorage.getItem('access_token');

  req = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + localToken),
  });

  return next(req);
}
