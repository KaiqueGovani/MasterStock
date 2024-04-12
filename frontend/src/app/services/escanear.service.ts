import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ESCANEAR_PATH } from './services.const';

@Injectable({
  providedIn: 'root',
})
export class EscanearService {
  constructor(private http: HttpClient) {}

  public escanear(qrcode: string): Observable<Object> {
    return this.http.get(ESCANEAR_PATH + qrcode);
  }
}
