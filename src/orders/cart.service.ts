import { Injectable } from '@nestjs/common';
import { UpdateCartDto } from '../dto/update-cart.dto';

@Injectable()
export class CartService {
  private carts: Record<number, { productId: number; quantity: number }[]> = {};

  getCart(userId: number) {
    return this.carts[userId] || [];
  }

  updateCart(userId: number, updateCartDto: UpdateCartDto) {
    this.carts[userId] = updateCartDto.items;
    return this.carts[userId];
  }

  addItem(userId: number, productId: number, quantity: number) {
    const cart = this.carts[userId] || [];
    const item = cart.find(i => i.productId === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    this.carts[userId] = cart;
    return cart;
  }

  removeItem(userId: number, productId: number) {
    const cart = this.carts[userId] || [];
    this.carts[userId] = cart.filter(i => i.productId !== productId);
    return this.carts[userId];
  }
}
