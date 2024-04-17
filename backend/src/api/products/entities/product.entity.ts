export class ProductModel {
  codigo: string;
  nome: string;
  quantidade?: string;
  desejado?: string;
  valor_total: string;
  valor_unitario: string;
  favoritado: boolean = false;
  descricao?: string;
  data_compra: string;
  imagem?: string;
}
