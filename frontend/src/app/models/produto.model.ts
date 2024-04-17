export interface Produto {
  _id: string;
  codigo?: string;
  nome: string;
  quantidade: string;
  desejado?: string;
  favoritado: boolean;
  valor_unitario: string;
  valor_total: string;
  descricao?: string;
  data_compra: Date;
  imagem?: string;
}
