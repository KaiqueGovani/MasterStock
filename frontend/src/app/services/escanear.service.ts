import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ESCANEAR_PATH } from './services.const';
import axiosInstance from '../interceptors/axios.interceptor';
import { ProdutosBot } from '../models/produtosBot.model';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EscanearService {
  constructor(private http: HttpClient) {}

  public async escanear(qrcode: string): Promise<ProdutosBot> {
    try {
      const data: AxiosResponse<ProdutosBot> = await axiosInstance.post(
        ESCANEAR_PATH,
        { read_content: qrcode }
      );

      return data.data;
    } catch (err) {
      throw err;
    }
  }
}
