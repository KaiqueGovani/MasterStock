import { ProductPayment } from './product-payment.entity';

export class PaymentModel {
  /**
   * Data e hora da compra
   * @example 2024-03-20 07:10:54
   */
  data_hora: Date;

  /**
   * Nome ou razão social do estabelecimento
   * @example PERALTA DISTRIBUIDORA DE ALIMENTOS LTDA
   */
  nome_razao_social: string;

  /**
   * Número do CFe
   * @example 049723
   */
  numero_cfe: string;

  /**
   * Produtos comprados
   */
  produtos: ProductPayment[];

  /**
   * Valor total da compra
   * @example 17.83
   */
  valor_completo: string;
}
