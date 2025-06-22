import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Obtener el carrito del usuario' })
  @ApiResponse({ status: 200, description: 'Carrito actual' })
  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @ApiOperation({ summary: 'Actualizar el carrito completo' })
  @ApiBody({ type: UpdateCartDto })
  @ApiResponse({ status: 200, description: 'Carrito actualizado' })
  @Post('update')
  updateCart(@Body() updateCartDto: UpdateCartDto, @Request() req) {
    return this.cartService.updateCart(req.user.userId, updateCartDto);
  }

  @ApiOperation({ summary: 'Agregar un producto al carrito' })
  @ApiParam({ name: 'productId', type: Number })
  @ApiParam({ name: 'quantity', type: Number })
  @ApiResponse({ status: 200, description: 'Producto agregado al carrito' })
  @Post('add/:productId/:quantity')
  addItem(@Param('productId') productId: number, @Param('quantity') quantity: number, @Request() req) {
    return this.cartService.addItem(req.user.userId, productId, quantity);
  }

  @ApiOperation({ summary: 'Quitar un producto del carrito' })
  @ApiParam({ name: 'productId', type: Number })
  @ApiResponse({ status: 200, description: 'Producto eliminado del carrito' })
  @Delete('remove/:productId')
  removeItem(@Param('productId') productId: number, @Request() req) {
    return this.cartService.removeItem(req.user.userId, productId);
  }
}
