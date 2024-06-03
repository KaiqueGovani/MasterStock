import { ProdutoBot } from './produtoBot.model';

export interface ProdutosBot {
  data: {
    data_hora: string;
    nome_razao_social: string;
    numero_cfe: string;
    produtos: ProdutoBot[];
    valor_completo: string;
  };
  message: string;
}
