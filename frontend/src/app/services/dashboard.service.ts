import { Injectable } from '@angular/core';
import axiosInstance from '../interceptors/axios.interceptor';
import { DASHBOARD_PATH } from './services.const';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

  public pegarQuantidadeProdutos(): Promise<number> {
    return axiosInstance
      .get(DASHBOARD_PATH + '/products')
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public pegarQuantidadeEmFalta(): Promise<number> {
    return axiosInstance
      .get(DASHBOARD_PATH + '/products/need')
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public pegarValorGastoMes(): Promise<number> {
    return axiosInstance
      .get(DASHBOARD_PATH + '/payments/month-value')
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}
