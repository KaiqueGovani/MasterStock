import { Controller, Get, Param, Delete, UseGuards, Post, Body, Logger } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { OperationException } from 'src/common/error/operation.exception';
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiBearerAuth()
@ApiTags('payments')
@ApiUnauthorizedResponse({ description: 'Acesso Negado!' })
@ApiResponse({ status: 500, description: 'Erro ao realizar operação!' })
@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    Logger.log('Creating payment');
    Logger.log(createPaymentDto);
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    try {
      return this.paymentsService.findAll();
    } catch (error) {
      console.error(error);
      throw new OperationException();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
  //   return this.paymentsService.update(+id, updatePaymentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
