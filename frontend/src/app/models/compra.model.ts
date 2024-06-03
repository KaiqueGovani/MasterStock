import { Produto } from './produto.model';

export interface Compra {
  // id: string;
  nome_razao_social: string;
  numero_cfe: string;
  produtos: Produto[];
  valor_completo: string;
  data_hora: string;
}
