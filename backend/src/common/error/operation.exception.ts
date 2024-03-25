import { HttpException } from '@nestjs/common';

export class OperationException extends HttpException {
  constructor() {
    super('Erro ao realizar operação!', 500);
  }
}
