export interface Produto {
  id?: number;
  nome: string;
  quantidade: string;
  desejado?: string;
  valor_unitario: string;
  valor_total: string;
  descricao?: string;
  dataCompra: Date;
  dataValidade?: Date;
  urlImagem?: string;
}
