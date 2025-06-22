import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Request, Patch, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';
import { UpdateProductDto } from '../dto/update-product.dto';


@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [Product] })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Product })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiBody({ type: CreateProductDto, description: 'Datos para crear el producto' })
  @ApiResponse({ status: 201, description: 'Producto creado', type: Product })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return this.productsService.create(createProductDto, req.user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Editar un producto' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado', type: Product })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req
  ) {
    return this.productsService.update(id, updateProductDto, req.user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.productsService.remove(id, req.user.userId);
  }
}
