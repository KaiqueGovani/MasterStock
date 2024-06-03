import { Injectable } from '@angular/core';
import { Compra } from '../models/compra.model';
import axiosInstance from '../interceptors/axios.interceptor';
import { EXTRATO_PATH } from './services.const';

@Injectable({
  providedIn: 'root',
})
export class ExtratoService {
  constructor() {}

  public pegarExtrato(): Promise<Compra[]> {
    return axiosInstance
      .get(EXTRATO_PATH)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}
