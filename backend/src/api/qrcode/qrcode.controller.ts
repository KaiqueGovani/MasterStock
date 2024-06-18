import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { OperationException } from 'src/common/error/operation.exception';
import { ProductModel } from '../products/entities/product.entity';
import { AuthGuard } from '../auth/auth.guard';
import { GetQrCodeDto } from './dto/get-qrcode.dto';
import { dataMock } from './mocks/qrcode.mock';
import { dataMock2 } from './mocks/qrcode2.mock';
import { dataMock3 } from './mocks/qrcode3.mock';

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
  async getQrCode(@Body() getQrCodeDto: GetQrCodeDto) {
    const present = false;
    try {
      let data: any;
      if (present) {
        data = Math.random() > 0.5 ? dataMock : dataMock2;
        data = dataMock3;
        data = dataMock2;
        data = dataMock;
        return { data, message: 'Url do QrCode lido com sucesso! Produtos obtidos via web-scraping.' };
      }

      const regex = /\b\d{44}\b/;
      const match = getQrCodeDto.read_content.match(regex);
      const extractedNumber = match ? match[0] : null;
      if (!extractedNumber) {
        throw new Error('Não foi possível extrair o número do QrCode.');
      }
      Logger.log('extractedNumber', extractedNumber);

      const response = await fetch('http://bot:5000/consultar-cfe/' + extractedNumber);
      Logger.debug('Finished fetch!');
      Logger.debug('response', response);
      data = await response.json();
      return { data, message: 'Url do QrCode lido com sucesso! Produtos obtidos via web-scraping.' };
    } catch (error) {
      console.error('error', error);
      throw new OperationException();
    }
  }
}
