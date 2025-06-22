import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async findAllByUser(userId: number) {
    return this.ordersRepository.find({ where: { user: { id: userId } }, relations: ['items', 'items.product'] });
  }

  async findOneByUser(orderId: number, userId: number) {
    const order = await this.ordersRepository.findOne({ where: { id: orderId, user: { id: userId } }, relations: ['items', 'items.product'] });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found for user`);
    }
    return order;
  }

  async create(createOrderDto: CreateOrderDto, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    let total = 0;
    // Transacción para evitar inconsistencias
    return await this.dataSource.transaction(async manager => {
      const items = await Promise.all(createOrderDto.items.map(async itemDto => {
        const product = await manager.findOne(Product, { where: { id: itemDto.productId } });
        if (!product) {
          throw new NotFoundException(`Product with ID ${itemDto.productId} not found`);
        }
        // Validar stock si existe campo stock
        if (typeof (product as any).stock === 'number') {
          const stock = (product as any).stock;
          if (stock < itemDto.quantity) {
            throw new BadRequestException(`Not enough stock for product ${product.name}`);
          }
          // Descontar stock
          (product as any).stock = stock - itemDto.quantity;
          await manager.save(product);
        }
        const price = product.price * itemDto.quantity;
        total += price;
        return manager.create(OrderItem, {
          product,
          quantity: itemDto.quantity,
          price: product.price, // El precio se infiere del producto
        });
      }));
      const order = manager.create(Order, {
        user,
        total,
        status: createOrderDto.status || 'pending',
        items,
      });
      return manager.save(order);
    });
  }
}
