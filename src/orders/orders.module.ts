import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product, User])],
  controllers: [OrdersController, CartController],
  providers: [OrdersService, CartService],
  exports: [OrdersService],
})
export class OrdersModule {}
