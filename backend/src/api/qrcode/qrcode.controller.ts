import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { OperationException } from 'src/common/error/operation.exception';
import { ProductModel } from '../products/entities/product.entity';
import { AuthGuard } from '../auth/auth.guard';
import { GetQrCodeDto } from './dto/get-qrcode.dto';

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
    try {
      // Mocking for testing purposes
      const data = {
        data_hora: '2024-03-20 07:10:54',
        nome_razao_social: 'PERALTA DISTRIBUIDORA DE ALIMENTOS LTDA',
        numero_cfe: '049723',
        produtos: [
          {
            codigo: '00000000037563',
            descricao: 'CAQUI CHOCOLATE',
            imagem: null,
            qtd_comercial: '0,4400',
            valor_bruto: '6,55',
            valor_unitario: '14,900',
          },
          {
            codigo: '00000000017947',
            descricao: 'PERA PORTUGUESA',
            imagem: null,
            qtd_comercial: '0,2750',
            valor_bruto: '5,19',
            valor_unitario: '18,900',
          },
          {
            codigo: '00000000015127',
            descricao: 'BANANA NANICA',
            imagem: null,
            qtd_comercial: '0,4050',
            valor_bruto: '2,22',
            valor_unitario: '5,490',
          },
          {
            codigo: '00000000019392',
            descricao: 'PAO FRANCES KG',
            imagem: null,
            qtd_comercial: '0,1800',
            valor_bruto: '2,87',
            valor_unitario: '15,980',
          },
          {
            codigo: '00000000049115',
            descricao: 'AMEIXA FRESCA I',
            imagem: null,
            qtd_comercial: '0,3900',
            valor_bruto: '5,06',
            valor_unitario: '12,980',
          },
        ],
        valor_completo: '21,89',
      };

      return { data, message: 'Url do QrCode lido com sucesso! Produtos obtidos via web-scraping.' };

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
      // const data = await response.json();
      return { data, message: 'Url do QrCode lido com sucesso! Produtos obtidos via web-scraping.' };
    } catch (error) {
      console.error('error', error);
      throw new OperationException();
    }
  }
}
