import { HttpException } from '@nestjs/common';

export class OperationException extends HttpException {
  constructor(message?: string) {
    super(message ?? 'Erro ao realizar operação!', 500);
  }
}
