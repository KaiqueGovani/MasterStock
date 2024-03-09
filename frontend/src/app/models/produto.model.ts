export interface Produto {
  id: number;
  nome: string;
  quantidade: number;
  desejado: number;
  preco: number;
  descricao: string;
  dataCompra: Date;
  dataValidade: Date;
  urlImagem: string;
}
