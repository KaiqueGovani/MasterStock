import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiBearerAuth()
@ApiTags('products')
@ApiUnauthorizedResponse({ description: 'Acesso Negado!' })
@ApiResponse({ status: 500, description: 'Erro ao realizar operação!' })
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiBody({ type: [CreateProductDto] })
  @Post('many')
  createBulk(@Body() createProductDtoList: CreateProductDto[]) {
    return this.productsService.createMany(createProductDtoList);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
