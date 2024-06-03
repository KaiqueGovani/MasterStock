import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { OperationException } from 'src/common/error/operation.exception';

@ApiBearerAuth()
@ApiTags('dashboard')
@ApiUnauthorizedResponse({ description: 'Acesso Negado!' })
@ApiResponse({ status: 500, description: 'Erro ao realizar operação!' })
@UseGuards(AuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @ApiResponse({ status: 200, description: 'Total de produtos cadastrados', type: Number })
  @Get('products')
  async totalProducts() {
    try {
      return await this.dashboardService.totalProducts();
    } catch (error) {
      console.error(error);
      throw new OperationException('Erro ao buscar total de produtos!');
    }
  }

  @ApiResponse({ status: 200, description: 'Total de produtos em falta', type: Number })
  @Get('products/need')
  async productsNeed() {
    try {
      const result = await this.dashboardService.productsNeed();
      return result.length > 0 ? result[0]['total'] : 0;
    } catch (error) {
      console.error(error);
      throw new OperationException('Erro ao buscar produtos em falta!');
    }
  }

  @ApiResponse({ status: 200, description: 'Valor pago do mês', type: Number })
  @Get('payments/month-value')
  async paymentsMonthValue() {
    try {
      const result = await this.dashboardService.paymentsMonthValue();
      return result.length > 0 ? result[0]['total'] : 0;
    } catch (error) {
      console.error(error);
      throw new OperationException('Erro ao buscar pagamentos do mês!');
    }
  }
}
