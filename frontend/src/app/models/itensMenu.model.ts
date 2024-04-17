import { PaginaEnum } from '../enum/pagina.enum';

export interface ItemMenu {
  nome: string;
  icon: string;
  url: PaginaEnum;
  ativo: boolean;
  classe?: string;
}
