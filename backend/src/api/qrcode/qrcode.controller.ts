import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { OperationException } from 'src/common/error/operation.exception';
import { ProductModel } from '../products/entities/product.entity';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('bot')
@ApiBearerAuth()
@ApiResponse({ status: 500, description: 'Erro ao realizar operação!' })
@ApiUnauthorizedResponse({ description: 'Acesso Negado!' })
@UseGuards(AuthGuard)
@Controller('qrcode')
export class QrcodeController {
  @ApiOkResponse({
    description: 'Url do QrCode lido com sucesso! Produtos obtidos via web-scraping.',
    type: [ProductModel],
  })
  @Post('/')
  async getQrCode(@Body() read_content: string) {
    try {
      const regex = /\b\d{44}\b/;
      const match = read_content.match(regex);
      const extractedNumber = match ? match[0] : null;
      console.error('extractedNumber', extractedNumber);

      const response = await fetch('http://bot:5000/consultar-cfe/' + read_content);
      const data = await response.json();
      return { data, message: 'Url do QrCode lido com sucesso! Produtos obtidos via web-scraping.' };
    } catch (error) {
      console.error('error', error);
      throw new OperationException();
    }
  }
}
