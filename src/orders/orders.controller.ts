import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { CreateOrderDto } from '../dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrdersService } from './orders.service';


@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Obtener todas las órdenes del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes', schema: { type: 'array', items: { $ref: '#/components/schemas/Order' } } })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    // Asegura que req.user existe y tiene userId
    if (!req.user || !req.user.userId) {
      throw new Error('No se encontró el usuario autenticado en la petición');
    }
    return this.ordersService.findAllByUser(req.user.userId);
  }

  @ApiOperation({ summary: 'Obtener una orden por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la orden' })
  @ApiResponse({ status: 200, description: 'Orden encontrada', schema: { $ref: '#/components/schemas/Order' } })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada para el usuario' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    if (!req.user || !req.user.userId) {
      throw new Error('No se encontró el usuario autenticado en la petición');
    }
    return this.ordersService.findOneByUser(id, req.user.userId);
  }

  @ApiOperation({ summary: 'Crear una orden' })
  @ApiBody({ type: CreateOrderDto, description: 'Datos para crear la orden (items, status opcional)' })
  @ApiResponse({ status: 201, description: 'Orden creada', schema: { $ref: '#/components/schemas/Order' } })
  @ApiResponse({ status: 400, description: 'Stock insuficiente o datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Usuario o producto no encontrado' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    if (!req.user || !req.user.userId) {
      throw new Error('No se encontró el usuario autenticado en la petición');
    }
    return this.ordersService.create(createOrderDto, req.user.userId);
  }
}
