import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Get, Param } from '@nestjs/common';
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
  @Get(':p')
  async getQrCode(@Param('p') p: string) {
    try {
      const response = await fetch('http://bot:5000/qrcodep/' + p);
      const data = await response.json();
      return { data, message: 'Url do QrCode lido com sucesso! Produtos obtidos via web-scraping.' };
    } catch (error) {
      console.error('error', error);
      throw new OperationException();
    }
  }
}
