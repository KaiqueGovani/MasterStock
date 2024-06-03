import { Produto } from './produto.model';

export interface Compra {
  id: string;
  nome_loja: string;
  produtos: Produto[];
  valor: number;
  data_pagamento: string;
}
