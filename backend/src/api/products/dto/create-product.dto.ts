import { Product } from '../product.schema';

export class CreateProductDto implements Product {
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
   * Quantidade de produto desejado
   * @example '3'
   */
  desejado?: string;

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
   * Produto favoritado
   * @example false
   */
  favoritado: boolean = false;

  /**
   * Descrição do produto
   * @example 'Camisa Polo Piquet Masculina'
   */
  descricao?: string;

  /**
   * Data da compra do produto
   * @example '2021-10-10'
   */
  data_compra: string;

  /**
   * Imagem do produto
   * @example 'https://loja.supermerclick.com.br/image/cache/catalog/produtos-integracao/003851-omie___coca-ls-1litro__conv-1000x1000.jpg'
   */
  imagem?: string;
}
