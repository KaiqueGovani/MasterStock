export class ProductPayment {
  /**
   * Código GTIN do produto
   * @example 42342342342
   */
  codigo: string;

  /**
   * Nome do produto
   * @example Arroz
   */
  descricao: string;

  /**
   * url da imagem do produto
   */
  imagem?: string;

  /**
   * Quantidade de produtos
   * @example 2
   */
  qtd_comercial: string;

  /**
   * Valor total do produto
   * @example 10.00
   */
  valor_bruto: string;

  /**
   * Valor unitário do produto
   * @example 5.00
   */
  valor_unitario: string;
}
