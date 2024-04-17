export interface Produto {
  id?: string;
  codigo?: string;
  nome: string;
  quantidade: string;
  desejado?: string;
  valor_unitario: string;
  valor_total: string;
  descricao?: string;
  data_compra: Date;
  imagem?: string;
}
