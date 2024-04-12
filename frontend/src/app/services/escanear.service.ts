import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EscanearService {
  private readonly escanear_path: string = 'bot/qrcode/';

  constructor(private http: HttpClient) {}

  public escanear(qrcode: string) {
    return this.http.get(this.escanear_path + qrcode);
  }
}
