import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { OperationException } from 'src/common/error/operation.exception';
import { ProductModel } from './entities/product.entity';

@ApiBearerAuth()
@ApiTags('products')
@ApiUnauthorizedResponse({ description: 'Acesso Negado!' })
@ApiResponse({ status: 500, description: 'Erro ao realizar operação!' })
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {
      console.error(error);
      throw new OperationException();
    }
  }

  @ApiBody({ type: [CreateProductDto] })
  @Post('many')
  async createBulk(@Body() createProductDtoList: CreateProductDto[]) {
    try {
      return await this.productsService.createMany(createProductDtoList);
    } catch (error) {
      console.error(error);
      throw new OperationException();
    }
  }

  @ApiOkResponse({ type: [ProductModel] })
  @Get()
  findAll() {
    try {
      return this.productsService.findAll();
    } catch (error) {
      console.error(error);
      throw new OperationException();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @ApiOkResponse({ description: 'Produto atualizado com sucesso!' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      await this.productsService.update(id, updateProductDto);
      return { message: 'Produto atualizado com sucesso!' };
    } catch (error) {
      console.error(error);
      throw new OperationException();
    }
  }

  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Produto removido com sucesso!' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.productsService.remove(id);
      return;
    } catch (error) {
      console.error(error);
      throw new OperationException();
    }
  }
}
