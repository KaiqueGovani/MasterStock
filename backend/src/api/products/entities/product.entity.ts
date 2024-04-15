export class ProductModel {
  /**
   * Código do produto
   * @example '27548726'
   */
  codigo: string;

  /**
   * Nome do produto
   * @example 'POLO PXGG MASC'
   */
  nome: string;

  /**
   * Quantidade do produto
   * @example '1'
   */
  quantidade?: string;

  /**
   * Valor total do produto
   * @example '49,99'
   */
  valor_total: string;

  /**
   * Valor unitário do produto
   * @example '49,99'
   */
  valor_unitario: string;

  /**
   * Imagem do produto
   * @example 'https://loja.supermerclick.com.br/image/cache/catalog/produtos-integracao/003851-omie___coca-ls-1litro__conv-1000x1000.jpg'
   */
  imagem?: string;
}
