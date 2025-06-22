import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Order, order => order.items)
  @ApiProperty({ type: () => Order })
  order: Order;

  @ManyToOne(() => Product)
  @ApiProperty({ type: () => Product })
  product: Product;

  @Column()
  @ApiProperty()
  quantity: number;

  @Column('decimal')
  @ApiProperty()
  price: number;
}
